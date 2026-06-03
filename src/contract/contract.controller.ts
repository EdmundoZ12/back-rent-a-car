import { CreateContractDto } from './dto/create-contract.dto';
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { OpenContractDto } from './dto/open-contract.dto';
import { CloseContractDto } from './dto/close-contract.dto';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post('open')
  openContract(@Body() dto: OpenContractDto) {
    return this.contractService.openContract(dto);
  }

  @Post()
  create(@Body() dto: CreateContractDto) {
    return this.contractService.create(dto);
  }

  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contractService.findOne(id);
  }

  @Patch(':id/close')
  close(@Param('id', ParseIntPipe) id: number) {
    return this.contractService.close(id);
  }

  @Patch(':id/close-full')
  closeContract(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CloseContractDto,
  ) {
    return this.contractService.closeContract(id, dto);
  }
}
