import { CreateGuaranteeDto } from './dto/create-guarantee.dto';
import { Guarantee } from './entities/guarantee.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractService } from '../contract/contract.service';

@Injectable()
export class GuaranteeService {
  constructor(
    @InjectRepository(Guarantee)
    private readonly guaranteeRepository: Repository<Guarantee>,
    private readonly contractService: ContractService,
  ) {}

  async create(dto: CreateGuaranteeDto): Promise<Guarantee> {
    const contract = await this.contractService.findOne(dto.contractId);

    const exists = await this.guaranteeRepository.findOne({
      where: { contract: { id: dto.contractId } },
    });

    if (exists) {
      throw new BadRequestException(
        `Guarantee already exists for contract ${dto.contractId}`,
      );
    }

    const guarantee = this.guaranteeRepository.create({
      ...dto,
      contract,
    });

    return this.guaranteeRepository.save(guarantee);
  }

  async findOne(id: number): Promise<Guarantee> {
    const guarantee = await this.guaranteeRepository.findOne({
      where: { id },
      relations: { contract: true },
    });
    if (!guarantee)
      throw new NotFoundException(`Guarantee with id ${id} not found`);
    return guarantee;
  }

  async findByContract(contractId: number): Promise<Guarantee> {
    const guarantee = await this.guaranteeRepository.findOne({
      where: { contract: { id: contractId } },
      relations: { contract: true },
    });
    if (!guarantee)
      throw new NotFoundException(
        `Guarantee for contract ${contractId} not found`,
      );
    return guarantee;
  }
}
