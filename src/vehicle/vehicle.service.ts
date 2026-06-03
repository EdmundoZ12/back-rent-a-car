import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { FuelTypeService } from '../fuel-type/fuel-type.service';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly vehicleTypeService: VehicleTypeService,
    private readonly fuelTypeService: FuelTypeService,
  ) {}

  async create(dto: CreateVehicleDto): Promise<Vehicle> {
    const vehicleType = await this.vehicleTypeService.findOne(
      dto.vehicleTypeId,
    );
    const fuelType = await this.fuelTypeService.findOne(dto.fuelTypeId);

    const vehicle = this.vehicleRepository.create({
      ...dto,
      vehicleType,
      fuelType,
    });

    return this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      relations: {
        vehicleType: { parent: true },
        fuelType: true,
      },
    });
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: {
        vehicleType: { parent: true },
        fuelType: true,
      },
    });
    if (!vehicle)
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    return vehicle;
  }
}
