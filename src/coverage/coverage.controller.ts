import { CreateCoverageDto } from './dto/create-coverage.dto';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CoverageService } from './coverage.service';

@Controller('coverages')
export class CoverageController {
  constructor(private readonly coverageService: CoverageService) {}

  @Post()
  create(@Body() dto: CreateCoverageDto) {
    return this.coverageService.create(dto);
  }

  @Get()
  findAll() {
    return this.coverageService.findAll();
  }

  @Get('mandatory')
  findMandatory() {
    return this.coverageService.findMandatory();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coverageService.findOne(id);
  }
}
