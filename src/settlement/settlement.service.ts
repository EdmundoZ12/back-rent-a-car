import { RateType } from '../rate/entities/rate.entity';
import { FuelLevel } from '../delivery/entities/delivery.entity';
import {
  UpdateSettlementDto,
  CreateSettlementDto,
} from './dto/create-settlement.dto';
import { Settlement } from './entities/settlement.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractService } from '../contract/contract.service';

@Injectable()
export class SettlementService {
  constructor(
    @InjectRepository(Settlement)
    private readonly settlementRepository: Repository<Settlement>,
    private readonly contractService: ContractService,
  ) {}

  // ─── Fuel level to fraction ───────────────────────────────────────────────
  private fuelLevelToFraction(level: FuelLevel): number {
    const map = {
      [FuelLevel.EMPTY]: 0,
      [FuelLevel.ONE_EIGHTH]: 1 / 8,
      [FuelLevel.ONE_QUARTER]: 2 / 8,
      [FuelLevel.THREE_EIGHTHS]: 3 / 8,
      [FuelLevel.HALF]: 4 / 8,
      [FuelLevel.FIVE_EIGHTHS]: 5 / 8,
      [FuelLevel.THREE_QUARTERS]: 6 / 8,
      [FuelLevel.SEVEN_EIGHTHS]: 7 / 8,
      [FuelLevel.FULL]: 8 / 8,
    };
    return map[level] ?? 0;
  }

  // ─── Calculate subtotal rates ─────────────────────────────────────────────
  private calculateSubtotalRates(contract: any): number {
    const { rate, delivery, contractCoverages } = contract;

    const departureDate = new Date(delivery.departure_datetime);
    const returnDate = new Date(delivery.return_datetime);
    const diffMs = returnDate.getTime() - departureDate.getTime();

    const diffMinutes = diffMs / (1000 * 60);
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const diffWeeks = diffDays / 7;
    const diffMonths = diffDays / 30;

    let units = 0;
    let extraUnits = 0;
    const tolerance = rate.tolerance_minutes;

    switch (rate.type) {
      case RateType.HOUR:
        units = Math.floor(diffHours);
        // 1 free extra hour
        const extraMinutesHour = diffMinutes - units * 60 - 60;
        if (extraMinutesHour > tolerance) extraUnits = 1;
        break;

      case RateType.DAY:
        units = Math.floor(diffDays);
        const extraMinutesDay = diffMinutes - units * 60 * 24;
        if (extraMinutesDay > tolerance) extraUnits = 1;
        break;

      case RateType.WEEK:
        units = Math.floor(diffWeeks);
        const extraMinutesWeek = diffMinutes - units * 60 * 24 * 7;
        if (extraMinutesWeek > tolerance) extraUnits = 1;
        break;

      case RateType.MONTH:
        units = Math.floor(diffMonths);
        const extraMinutesMonth = diffMinutes - units * 60 * 24 * 30;
        if (extraMinutesMonth > tolerance) extraUnits = 1;
        break;
    }

    const totalUnits = units + extraUnits;
    let subtotal = totalUnits * Number(rate.price);

    // Add vehicle type prices up the tree
    let vehicleType = contract.vehicle.vehicleType;
    while (vehicleType) {
      subtotal += Number(vehicleType.price);
      vehicleType = vehicleType.parent;
    }

    // Add coverages
    const coveragesTotal = contractCoverages.reduce((sum: number, cc: any) => {
      return sum + Number(cc.coverage.price_per_day) * totalUnits;
    }, 0);

    return subtotal + coveragesTotal;
  }

  // ─── Calculate subtotal fuel ──────────────────────────────────────────────
  private calculateSubtotalFuel(contract: any): number {
    const { delivery, vehicle } = contract;

    if (!delivery.return_fuel) return 0;

    const departureFraction = this.fuelLevelToFraction(delivery.departure_fuel);
    const returnFraction = this.fuelLevelToFraction(delivery.return_fuel);
    const diff = departureFraction - returnFraction;

    if (diff <= 0) return 0;

    const missingLiters = diff * Number(vehicle.tank_capacity);
    const pricePerLiter = Number(vehicle.fuelType.price_per_liter);

    return missingLiters * pricePerLiter;
  }

  // ─── Create ───────────────────────────────────────────────────────────────
  async create(dto: CreateSettlementDto): Promise<Settlement> {
    const contract = await this.contractService.findOne(dto.contractId);

    const exists = await this.settlementRepository.findOne({
      where: { contract: { id: dto.contractId } },
    });

    if (exists) {
      throw new BadRequestException(
        `Settlement already exists for contract ${dto.contractId}`,
      );
    }

    const settlement = this.settlementRepository.create({
      ...dto,
      contract,
    });

    return this.settlementRepository.save(settlement);
  }

  // ─── Find one ─────────────────────────────────────────────────────────────
  async findOne(id: number): Promise<Settlement> {
    const settlement = await this.settlementRepository.findOne({
      where: { id },
      relations: { contract: true },
    });
    if (!settlement)
      throw new NotFoundException(`Settlement with id ${id} not found`);
    return settlement;
  }

  // ─── Find by contract ─────────────────────────────────────────────────────
  async findByContract(contractId: number): Promise<Settlement> {
    const settlement = await this.settlementRepository.findOne({
      where: { contract: { id: contractId } },
      relations: { contract: true },
    });
    if (!settlement)
      throw new NotFoundException(
        `Settlement for contract ${contractId} not found`,
      );
    return settlement;
  }

  // ─── Calculate ────────────────────────────────────────────────────────────
  async calculate(contractId: number): Promise<Settlement> {
    const contract = await this.contractService.findOne(contractId);

    if (!contract.delivery?.return_datetime) {
      throw new BadRequestException(
        `Cannot calculate settlement without return datetime`,
      );
    }

    let settlement = await this.settlementRepository.findOne({
      where: { contract: { id: contractId } },
    });

    if (!settlement) {
      settlement = this.settlementRepository.create({ contract });
    }

    const subtotalRates = this.calculateSubtotalRates(contract);
    const subtotalFuel = this.calculateSubtotalFuel(contract);

    const totalDeductions =
      Number(settlement.advance_payment1 ?? 0) +
      Number(settlement.advance_payment2 ?? 0) +
      Number(settlement.voucher ?? 0) +
      Number(settlement.expense_refund ?? 0);

    const vatRate = 0.13;
    const baseTotal = subtotalRates + subtotalFuel;
    const vat = baseTotal * vatRate;
    const stampTax = Number(settlement.stamp_tax ?? 0);

    const grandTotal = baseTotal + vat + stampTax - totalDeductions;

    settlement.subtotal_rates = subtotalRates;
    settlement.subtotal_fuel = subtotalFuel;
    settlement.total_deductions = totalDeductions;
    settlement.vat = vat;
    settlement.grand_total = grandTotal;

    return this.settlementRepository.save(settlement);
  }

  // ─── Close ────────────────────────────────────────────────────────────────
  async close(
    contractId: number,
    dto: UpdateSettlementDto,
  ): Promise<Settlement> {
    const settlement = await this.findByContract(contractId);

    if (settlement.closed_at) {
      throw new BadRequestException(
        `Settlement for contract ${contractId} is already closed`,
      );
    }

    Object.assign(settlement, dto);
    settlement.closed_at = new Date();

    return this.settlementRepository.save(settlement);
  }
}
