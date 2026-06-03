import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { Delivery } from './entities/delivery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from '../contract/contract.module';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService],
  imports: [TypeOrmModule.forFeature([Delivery]), ContractModule],
  exports: [TypeOrmModule, DeliveryService],
})
export class DeliveryModule {}
