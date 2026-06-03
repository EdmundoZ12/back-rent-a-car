import { Module } from '@nestjs/common';
import { SettlementService } from './settlement.service';
import { SettlementController } from './settlement.controller';
import { Settlement } from './entities/settlement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from '../contract/contract.module';

@Module({
  controllers: [SettlementController],
  providers: [SettlementService],
  imports: [TypeOrmModule.forFeature([Settlement]), ContractModule],
  exports: [TypeOrmModule, SettlementService],
})
export class SeattlementModule {}
