import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeController } from './vehicle-type.controller';
import { VehicleType } from './entities/vehicle-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService],
  imports: [TypeOrmModule.forFeature([VehicleType])],
  exports: [TypeOrmModule, VehicleTypeService],
})
export class VehicleTypeModule {}
