import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractService } from '../contract/contract.service';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    private readonly contractService: ContractService,
  ) {}

  async create(dto: CreateDeliveryDto): Promise<Delivery> {
    const contract = await this.contractService.findOne(dto.contractId);

    const exists = await this.deliveryRepository.findOne({
      where: { contract: { id: dto.contractId } },
    });

    if (exists) {
      throw new BadRequestException(
        `Delivery already exists for contract ${dto.contractId}`,
      );
    }

    const delivery = this.deliveryRepository.create({
      ...dto,
      contract,
    });

    return this.deliveryRepository.save(delivery);
  }

  async findOne(id: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id },
      relations: { contract: true },
    });
    if (!delivery)
      throw new NotFoundException(`Delivery with id ${id} not found`);
    return delivery;
  }

  async findByContract(contractId: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { contract: { id: contractId } },
      relations: { contract: true },
    });
    if (!delivery)
      throw new NotFoundException(
        `Delivery for contract ${contractId} not found`,
      );
    return delivery;
  }

  async registerReturn(
    contractId: number,
    dto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.findByContract(contractId);

    if (delivery.return_datetime) {
      throw new BadRequestException(
        `Return already registered for contract ${contractId}`,
      );
    }

    if (!dto.return_datetime) {
      throw new BadRequestException(`return_datetime is required`);
    }

    if (!dto.return_fuel) {
      throw new BadRequestException(`return_fuel is required`);
    }

    if (!dto.return_km) {
      throw new BadRequestException(`return_km is required`);
    }

    Object.assign(delivery, dto);
    return this.deliveryRepository.save(delivery);
  }
}
