import { Person } from './../person/entities/person.entity';
import { Coverage } from './../coverage/entities/coverage.entity';
import { Rate } from './../rate/entities/rate.entity';
import { Vehicle } from './../vehicle/entities/vehicle.entity';
import { VehicleType } from './../vehicle-type/entities/vehicle-type.entity';
import { FuelType } from './../fuel-type/entities/fuel-type.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FuelType,
      VehicleType,
      Vehicle,
      Rate,
      Coverage,
      Person,
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
