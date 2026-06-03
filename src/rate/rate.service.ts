import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './entities/rate.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
  ) {}

  async create(dto: CreateRateDto): Promise<Rate> {
    const rate = this.rateRepository.create(dto);
    return this.rateRepository.save(rate);
  }

  async findAll(): Promise<Rate[]> {
    return this.rateRepository.find();
  }

  async findOne(id: number): Promise<Rate> {
    const rate = await this.rateRepository.findOne({
      where: { id },
    });
    if (!rate) throw new NotFoundException(`Rate with id ${id} not found`);
    return rate;
  }
}
