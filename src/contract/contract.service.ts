import { RateType } from './../rate/entities/rate.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { Contract, ContractStatus } from './entities/contract.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PersonService } from '../person/person.service';
import { RequesterService } from '../requester/requester.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { RateService } from '../rate/rate.service';
import { Delivery } from '../delivery/entities/delivery.entity';
import { Guarantee } from '../guarantee/entities/guarantee.entity';
import { ContractCoverage } from '../contract-coverage/entities/contract-coverage.entity';
import { Coverage } from '../coverage/entities/coverage.entity';
import { OpenContractDto } from './dto/open-contract.dto';
import { CloseContractDto } from './dto/close-contract.dto';
import { Settlement } from '../settlement/entities/settlement.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,

    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,

    @InjectRepository(Guarantee)
    private readonly guaranteeRepository: Repository<Guarantee>,

    @InjectRepository(ContractCoverage)
    private readonly contractCoverageRepository: Repository<ContractCoverage>,

    @InjectRepository(Coverage)
    private readonly coverageRepository: Repository<Coverage>,

    @InjectRepository(Settlement)
    private readonly settlementRepository: Repository<Settlement>,

    private readonly personService: PersonService,
    private readonly requesterService: RequesterService,
    private readonly vehicleService: VehicleService,
    private readonly rateService: RateService,
    private readonly dataSource: DataSource,
  ) {}

  async openContract(dto: OpenContractDto): Promise<Contract> {
    return this.dataSource.transaction(async (manager) => {
      // ─── Buscar entidades relacionadas ──────────────────────
      const client1 = await this.personService.findOne(dto.client1Id);
      const vehicle = await this.vehicleService.findOne(dto.vehicleId);
      const rate = await this.rateService.findOne(dto.rateId);

      // ─── Crear contrato ─────────────────────────────────────
      const contract = manager.create(Contract, {
        client1,
        vehicle,
        rate,
        status: ContractStatus.OPEN,
        pickup_location: dto.pickup_location,
        return_location: dto.return_location,
        circulation_area: dto.circulation_area,
        expected_return: new Date(dto.expected_return),
      });

      if (dto.client2Id) {
        contract.client2 = await this.personService.findOne(dto.client2Id);
      }

      if (dto.requesterId) {
        contract.requester = await this.requesterService.findOne(
          dto.requesterId,
        );
      }

      const savedContract = await manager.save(Contract, contract);

      // ─── Crear delivery ─────────────────────────────────────
      const delivery = manager.create(Delivery, {
        contract: savedContract,
        departure_datetime: new Date(dto.departure_datetime),
        departure_km: dto.departure_km,
        departure_fuel: dto.departure_fuel,
      });

      await manager.save(Delivery, delivery);

      // ─── Crear guarantee ────────────────────────────────────
      const guarantee = manager.create(Guarantee, {
        contract: savedContract,
        card_number: dto.card_number,
        bank_name: dto.bank_name,
        location: dto.guarantee_location,
        valid_until: new Date(dto.valid_until),
        pa_code: dto.pa_code,
        security_code: dto.security_code,
        value_bs: dto.value_bs,
        card_type: dto.card_type,
        notes: dto.notes,
      });

      await manager.save(Guarantee, guarantee);

      // ─── Crear contract coverages ───────────────────────────
      for (const coverageId of dto.coverageIds) {
        const coverage = await this.coverageRepository.findOne({
          where: { id: coverageId },
        });
        if (!coverage)
          throw new NotFoundException(`Coverage ${coverageId} not found`);

        const contractCoverage = manager.create(ContractCoverage, {
          contract: savedContract,
          coverage,
        });

        await manager.save(ContractCoverage, contractCoverage);
      }

      const result = await manager.findOne(Contract, {
        where: { id: savedContract.id },
        relations: {
          client1: true,
          client2: true,
          requester: true,
          vehicle: { vehicleType: { parent: true }, fuelType: true },
          rate: true,
          contractCoverages: { coverage: true },
          delivery: true,
          guarantee: true,
          settlement: true,
        },
      });

      if (!result)
        throw new NotFoundException(
          `Contract with id ${savedContract.id} not found`,
        );

      return result;
    });
  }

  async create(dto: CreateContractDto): Promise<Contract> {
    const client1 = await this.personService.findOne(dto.client1Id);
    const vehicle = await this.vehicleService.findOne(dto.vehicleId);
    const rate = await this.rateService.findOne(dto.rateId);

    const contract = this.contractRepository.create({
      ...dto,
      client1,
      vehicle,
      rate,
      status: ContractStatus.OPEN,
    });

    if (dto.client2Id) {
      contract.client2 = await this.personService.findOne(dto.client2Id);
    }

    if (dto.requesterId) {
      contract.requester = await this.requesterService.findOne(dto.requesterId);
    }

    return this.contractRepository.save(contract);
  }

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find({
      relations: {
        client1: true,
        client2: true,
        requester: true,
        vehicle: { vehicleType: { parent: true }, fuelType: true },
        rate: true,
        contractCoverages: { coverage: true },
        delivery: true,
        guarantee: true,
        settlement: true,
      },
    });
  }

  async findOne(id: number): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { id },
      relations: {
        client1: true,
        client2: true,
        requester: true,
        vehicle: { vehicleType: { parent: true }, fuelType: true },
        rate: true,
        contractCoverages: { coverage: true },
        delivery: true,
        guarantee: true,
        settlement: true,
      },
    });
    if (!contract)
      throw new NotFoundException(`Contract with id ${id} not found`);
    return contract;
  }

  async close(id: number): Promise<Contract> {
    const contract = await this.findOne(id);

    if (contract.status === ContractStatus.CLOSED) {
      throw new BadRequestException(`Contract with id ${id} is already closed`);
    }

    if (!contract.delivery?.return_datetime) {
      throw new BadRequestException(
        `Contract cannot be closed without a return datetime`,
      );
    }

    if (!contract.settlement?.closed_at) {
      throw new BadRequestException(
        `Contract cannot be closed without a settlement`,
      );
    }

    contract.status = ContractStatus.CLOSED;
    return this.contractRepository.save(contract);
  }

  async closeContract(id: number, dto: CloseContractDto): Promise<Contract> {
    console.log('DTO recibido:', JSON.stringify(dto));
    console.log('return_datetime:', dto.return_datetime);
    console.log('Parsed date:', new Date(dto.return_datetime));

    const contract = await this.findOne(id);

    if (contract.status === ContractStatus.CLOSED) {
      throw new BadRequestException(`Contract with id ${id} is already closed`);
    }

    if (!contract.delivery) {
      throw new BadRequestException(`Contract has no delivery registered`);
    }

    if (contract.delivery.return_datetime) {
      throw new BadRequestException(
        `Return already registered for this contract`,
      );
    }

    // ─── 1. Registrar retorno ────────────────────────────────
    const delivery = contract.delivery;
    delivery.return_datetime = new Date(dto.return_datetime);
    delivery.return_km = dto.return_km;
    delivery.return_fuel = dto.return_fuel;
    await this.deliveryRepository.save(delivery);

    // ─── 2. Calcular tiempo ──────────────────────────────────
    const { rate, vehicle, contractCoverages } = contract;
    const departureDate = new Date(delivery.departure_datetime);
    const returnDate = new Date(dto.return_datetime);
    const diffMs = returnDate.getTime() - departureDate.getTime();
    const diffMinutes = diffMs / (1000 * 60);
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const diffWeeks = diffDays / 7;
    const diffMonths = diffDays / 30;
    const tolerance = rate.tolerance_minutes;

    let units = 0;
    let extraUnits = 0;

    switch (rate.type) {
      case RateType.HOUR: {
        units = Math.floor(diffHours);
        const extraMinutesHour = diffMinutes - units * 60 - 60;
        if (extraMinutesHour > tolerance) extraUnits = 1;
        break;
      }
      case RateType.DAY: {
        units = Math.floor(diffDays);
        const extraMinutesDay = diffMinutes - units * 60 * 24;
        if (extraMinutesDay > tolerance) extraUnits = 1;
        break;
      }
      case RateType.WEEK: {
        units = Math.floor(diffWeeks);
        const extraMinutesWeek = diffMinutes - units * 60 * 24 * 7;
        if (extraMinutesWeek > tolerance) extraUnits = 1;
        break;
      }
      case RateType.MONTH: {
        units = Math.floor(diffMonths);
        const extraMinutesMonth = diffMinutes - units * 60 * 24 * 30;
        if (extraMinutesMonth > tolerance) extraUnits = 1;
        break;
      }
    }

    const totalUnits = units + extraUnits;

    // ─── 3. Calcular subtotal tarifas ────────────────────────
    let subtotalRates = totalUnits * Number(rate.price);

    // Sumar precios del árbol de vehicle_type
    let vehicleType = vehicle.vehicleType;
    while (vehicleType) {
      subtotalRates += Number(vehicleType.price);
      vehicleType = vehicleType.parent;
    }

    // Sumar coberturas
    subtotalRates += contractCoverages.reduce((sum, cc) => {
      return sum + Number(cc.coverage.price_per_day) * totalUnits;
    }, 0);

    // ─── 4. Calcular subtotal combustible ────────────────────
    const fuelMap: Record<string, number> = {
      V: 0,
      '1/8': 1 / 8,
      '1/4': 2 / 8,
      '3/8': 3 / 8,
      '1/2': 4 / 8,
      '5/8': 5 / 8,
      '3/4': 6 / 8,
      '7/8': 7 / 8,
      F: 1,
    };

    const departureFraction = fuelMap[delivery.departure_fuel] ?? 0;
    const returnFraction = fuelMap[dto.return_fuel] ?? 0;
    const fuelDiff = departureFraction - returnFraction;
    const subtotalFuel =
      fuelDiff > 0
        ? fuelDiff *
          Number(vehicle.tank_capacity) *
          Number(vehicle.fuelType.price_per_liter)
        : 0;

    // ─── 5. Calcular deducciones ─────────────────────────────
    const totalDeductions =
      Number(dto.advance_payment1 ?? 0) +
      Number(dto.advance_payment2 ?? 0) +
      Number(dto.voucher ?? 0) +
      Number(dto.expense_refund ?? 0);

    const baseTotal = subtotalRates + subtotalFuel;
    const vat = baseTotal * 0.13;
    const stampTax = Number(dto.stamp_tax ?? 0);
    const grandTotal = baseTotal + vat + stampTax - totalDeductions;

    // ─── 6. Crear settlement ──────────────────────────────────
    const settlement = this.settlementRepository.create({
      contract,
      subtotal_rates: subtotalRates,
      subtotal_fuel: subtotalFuel,
      advance_payment1: dto.advance_payment1 ?? 0,
      advance_payment2: dto.advance_payment2 ?? 0,
      voucher: dto.voucher ?? 0,
      expense_refund: dto.expense_refund ?? 0,
      vat,
      stamp_tax: stampTax,
      total_deductions: totalDeductions,
      grand_total: grandTotal,
      closed_at: new Date(),
    });

    const savedSettlement = await this.settlementRepository.save(settlement);
    console.log('Settlement id:', savedSettlement.id);
    console.log('Settlement grand_total:', savedSettlement.grand_total);

    // ─── 7. Cerrar contrato ───────────────────────────────────
    contract.status = ContractStatus.CLOSED;
    await this.contractRepository.update(id, { status: ContractStatus.CLOSED });

    return this.findOne(id);
  }
}
