import { VehicleTypeModule } from './../vehicle-type/vehicle-type.module';
import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { Vehicle } from './entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuelTypeModule } from '../fuel-type/fuel-type.module';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService],
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    VehicleTypeModule,
    FuelTypeModule,
  ],
  exports: [TypeOrmModule, VehicleService],
})
export class VehicleModule {}
