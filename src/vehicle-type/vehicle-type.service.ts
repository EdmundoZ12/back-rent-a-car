import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { VehicleType } from './entities/vehicle-type.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleType)
    private readonly vehicleTypeRepository: Repository<VehicleType>,
  ) {}

  async create(dto: CreateVehicleTypeDto): Promise<VehicleType> {
    const vehicleType = this.vehicleTypeRepository.create({
      name: dto.name,
      price: dto.price,
    });

    if (dto.parentId) {
      const parent = await this.vehicleTypeRepository.findOne({
        where: { id: dto.parentId },
      });
      if (!parent)
        throw new NotFoundException(`Parent with id ${dto.parentId} not found`);
      vehicleType.parent = parent;
    }

    return this.vehicleTypeRepository.save(vehicleType);
  }

  async findAll(): Promise<VehicleType[]> {
    return this.vehicleTypeRepository.find({
      relations: { parent: true, children: true },
    });
  }

  async findOne(id: number): Promise<VehicleType> {
    const vehicleType = await this.vehicleTypeRepository.findOne({
      where: { id },
      relations: { parent: true, children: true },
    });
    if (!vehicleType)
      throw new NotFoundException(`VehicleType with id ${id} not found`);
    return vehicleType;
  }

  async findTree(): Promise<VehicleType[]> {
    return this.vehicleTypeRepository.find({
      where: { parent: IsNull() },
      relations: { children: { children: true } },
    });
  }
}
