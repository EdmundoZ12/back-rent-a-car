import { CreateGuaranteeDto } from './dto/create-guarantee.dto';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { GuaranteeService } from './guarantee.service';

@Controller('guarantees')
export class GuaranteeController {
  constructor(private readonly guaranteeService: GuaranteeService) {}

  @Post()
  create(@Body() dto: CreateGuaranteeDto) {
    return this.guaranteeService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.guaranteeService.findOne(id);
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId', ParseIntPipe) contractId: number) {
    return this.guaranteeService.findByContract(contractId);
  }
}
