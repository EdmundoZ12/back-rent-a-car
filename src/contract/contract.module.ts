import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { PersonModule } from '../person/person.module';
import { RequesterModule } from '../requester/requester.module';
import { RateModule } from '../rate/rate.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { Delivery } from '../delivery/entities/delivery.entity';
import { Guarantee } from '../guarantee/entities/guarantee.entity';
import { ContractCoverage } from '../contract-coverage/entities/contract-coverage.entity';
import { Coverage } from '../coverage/entities/coverage.entity';
import { Settlement } from '../settlement/entities/settlement.entity';

@Module({
  controllers: [ContractController],
  providers: [ContractService],
  imports: [
    TypeOrmModule.forFeature([
      Contract,
      Delivery,
      Guarantee,
      ContractCoverage,
      Coverage,
      Settlement,
    ]),
    PersonModule,
    RequesterModule,
    RateModule,
    VehicleModule,
  ],
  exports: [TypeOrmModule, ContractService],
})
export class ContractModule {}
