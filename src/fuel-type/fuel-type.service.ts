import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import { FuelType } from './entities/fuel-type.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FuelTypeService {
  constructor(
    @InjectRepository(FuelType)
    private readonly fuelTypeRepository: Repository<FuelType>,
  ) {}

  async create(dto: CreateFuelTypeDto): Promise<FuelType> {
    const fuelType = this.fuelTypeRepository.create(dto);
    return this.fuelTypeRepository.save(fuelType);
  }

  async findAll(): Promise<FuelType[]> {
    return this.fuelTypeRepository.find();
  }

  async findOne(id: number): Promise<FuelType> {
    const fuelType = await this.fuelTypeRepository.findOne({
      where: { id },
    });
    if (!fuelType)
      throw new NotFoundException(`FuelType with id ${id} not found`);
    return fuelType;
  }
}
