import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { PersonModule } from './person/person.module';
import { RequesterModule } from './requester/requester.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { FuelTypeModule } from './fuel-type/fuel-type.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { RateModule } from './rate/rate.module';
import { CoverageModule } from './coverage/coverage.module';
import { ContractModule } from './contract/contract.module';
import { ContractCoverageModule } from './contract-coverage/contract-coverage.module';
import { DeliveryModule } from './delivery/delivery.module';
import { GuaranteeModule } from './guarantee/guarantee.module';
import { SeattlementModule } from './settlement/settlement.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => databaseConfig(),
    }),
    PersonModule,
    RequesterModule,
    VehicleTypeModule,
    FuelTypeModule,
    VehicleModule,
    RateModule,
    CoverageModule,
    ContractModule,
    ContractCoverageModule,
    DeliveryModule,
    GuaranteeModule,
    SeattlementModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
