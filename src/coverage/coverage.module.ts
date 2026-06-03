import { Module } from '@nestjs/common';
import { CoverageService } from './coverage.service';
import { CoverageController } from './coverage.controller';
import { Coverage } from './entities/coverage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from '../contract/contract.module';

@Module({
  controllers: [CoverageController],
  providers: [CoverageService],
  imports: [
    TypeOrmModule.forFeature([Coverage]),
    ContractModule,
  ],
  exports: [TypeOrmModule, CoverageService],
})
export class CoverageModule {}
