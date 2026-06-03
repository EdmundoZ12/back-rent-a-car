import { Coverage } from './entities/coverage.entity';
import { CreateCoverageDto } from './dto/create-coverage.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoverageService {
  constructor(
    @InjectRepository(Coverage)
    private readonly coverageRepository: Repository<Coverage>,
  ) {}

  async create(dto: CreateCoverageDto): Promise<Coverage> {
    const coverage = this.coverageRepository.create(dto);
    return this.coverageRepository.save(coverage);
  }

  async findAll(): Promise<Coverage[]> {
    return this.coverageRepository.find();
  }

  async findOne(id: number): Promise<Coverage> {
    const coverage = await this.coverageRepository.findOne({
      where: { id },
    });
    if (!coverage)
      throw new NotFoundException(`Coverage with id ${id} not found`);
    return coverage;
  }

  async findMandatory(): Promise<Coverage[]> {
    return this.coverageRepository.find({
      where: { is_mandatory: true },
    });
  }
}
