import { SettlementService } from './settlement.service';
import {
  CreateSettlementDto,
  UpdateSettlementDto,
} from './dto/create-settlement.dto';
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('settlements')
export class SettlementController {
  constructor(private readonly settlementService: SettlementService) {}

  @Post()
  create(@Body() dto: CreateSettlementDto) {
    return this.settlementService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.settlementService.findOne(id);
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId', ParseIntPipe) contractId: number) {
    return this.settlementService.findByContract(contractId);
  }

  @Patch('contract/:contractId/calculate')
  calculate(@Param('contractId', ParseIntPipe) contractId: number) {
    return this.settlementService.calculate(contractId);
  }

  @Patch('contract/:contractId/close')
  close(
    @Param('contractId', ParseIntPipe) contractId: number,
    @Body() dto: UpdateSettlementDto,
  ) {
    return this.settlementService.close(contractId, dto);
  }
}
