import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';

@Module({
  controllers: [RateController],
  providers: [RateService],
  imports: [TypeOrmModule.forFeature([Rate])],
  exports: [TypeOrmModule, RateService],
})
export class RateModule {}
