import { CreateContractCoverageDto } from './dto/create-contract-coverage.dto';
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ContractCoverageService } from './contract-coverage.service';

@Controller('contract-coverages')
export class ContractCoverageController {
  constructor(
    private readonly contractCoverageService: ContractCoverageService,
  ) {}

  @Post()
  addCoverage(@Body() dto: CreateContractCoverageDto) {
    return this.contractCoverageService.addCoverage(dto);
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId', ParseIntPipe) contractId: number) {
    return this.contractCoverageService.findByContract(contractId);
  }

  @Delete('contract/:contractId/coverage/:coverageId')
  removeCoverage(
    @Param('contractId', ParseIntPipe) contractId: number,
    @Param('coverageId', ParseIntPipe) coverageId: number,
  ) {
    return this.contractCoverageService.removeCoverage(contractId, coverageId);
  }
}
