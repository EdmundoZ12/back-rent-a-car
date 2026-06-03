import { Module } from '@nestjs/common';
import { FuelTypeService } from './fuel-type.service';
import { FuelTypeController } from './fuel-type.controller';
import { FuelType } from './entities/fuel-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FuelTypeController],
  providers: [FuelTypeService],
  imports: [TypeOrmModule.forFeature([FuelType])],
  exports: [TypeOrmModule, FuelTypeService],
})
export class FuelTypeModule {}
