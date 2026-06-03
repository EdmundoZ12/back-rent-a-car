import { Module } from '@nestjs/common';
import { GuaranteeService } from './guarantee.service';
import { GuaranteeController } from './guarantee.controller';
import { Guarantee } from './entities/guarantee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from '../contract/contract.module';

@Module({
  controllers: [GuaranteeController],
  providers: [GuaranteeService],
  imports: [TypeOrmModule.forFeature([Guarantee]), ContractModule],
  exports: [TypeOrmModule, GuaranteeService],
})
export class GuaranteeModule {}
