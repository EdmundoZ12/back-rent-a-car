import { CreateContractCoverageDto } from './dto/create-contract-coverage.dto';
import { ContractCoverage } from './entities/contract-coverage.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractService } from '../contract/contract.service';
import { CoverageService } from '../coverage/coverage.service';

@Injectable()
export class ContractCoverageService {
  constructor(
    @InjectRepository(ContractCoverage)
    private readonly contractCoverageRepository: Repository<ContractCoverage>,
    private readonly contractService: ContractService,
    private readonly coverageService: CoverageService,
  ) {}

  async addCoverage(dto: CreateContractCoverageDto): Promise<ContractCoverage> {
    const contract = await this.contractService.findOne(dto.contractId);
    const coverage = await this.coverageService.findOne(dto.coverageId);

    const exists = await this.contractCoverageRepository.findOne({
      where: {
        contract: { id: dto.contractId },
        coverage: { id: dto.coverageId },
      },
    });

    if (exists) {
      throw new BadRequestException(
        `Coverage ${dto.coverageId} already added to contract ${dto.contractId}`,
      );
    }

    const contractCoverage = this.contractCoverageRepository.create({
      contract,
      coverage,
    });

    return this.contractCoverageRepository.save(contractCoverage);
  }

  async removeCoverage(contractId: number, coverageId: number): Promise<void> {
    const contractCoverage = await this.contractCoverageRepository.findOne({
      where: {
        contract: { id: contractId },
        coverage: { id: coverageId },
      },
      relations: { coverage: true },
    });

    if (!contractCoverage) {
      throw new NotFoundException(
        `Coverage ${coverageId} not found in contract ${contractId}`,
      );
    }

    if (contractCoverage.coverage.is_mandatory) {
      throw new BadRequestException(`Cannot remove mandatory coverage`);
    }

    await this.contractCoverageRepository.remove(contractCoverage);
  }

  async findByContract(contractId: number): Promise<ContractCoverage[]> {
    return this.contractCoverageRepository.find({
      where: { contract: { id: contractId } },
      relations: { coverage: true },
    });
  }
}
