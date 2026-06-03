import { Module } from '@nestjs/common';
import { RequesterService } from './requester.service';
import { RequesterController } from './requester.controller';
import { Requester } from './entities/requester.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from '../person/person.module';

@Module({
  controllers: [RequesterController],
  providers: [RequesterService],
  imports: [TypeOrmModule.forFeature([Requester]), PersonModule],
  exports: [TypeOrmModule, RequesterService],
})
export class RequesterModule {}
