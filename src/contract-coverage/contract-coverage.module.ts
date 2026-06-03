import { Module } from '@nestjs/common';
import { ContractCoverageService } from './contract-coverage.service';
import { ContractCoverageController } from './contract-coverage.controller';
import { ContractCoverage } from './entities/contract-coverage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from '../contract/contract.module';
import { CoverageModule } from '../coverage/coverage.module';

@Module({
  controllers: [ContractCoverageController],
  providers: [ContractCoverageService],
  imports: [
    TypeOrmModule.forFeature([ContractCoverage]),
    ContractModule,
    CoverageModule,
  ],
  exports: [TypeOrmModule, ContractCoverageService],
})
export class ContractCoverageModule {}
