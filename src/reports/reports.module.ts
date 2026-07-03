import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ContractModule } from '../contract/contract.module';
import { PrinterModule } from '../printer/printer.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [ContractModule, PrinterModule],
})
export class ReportsModule {}
