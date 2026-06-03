import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { FuelTypeService } from './fuel-type.service';

@Controller('fuel-types')
export class FuelTypeController {
  constructor(private readonly fuelTypeService: FuelTypeService) {}

  @Post()
  create(@Body() dto: CreateFuelTypeDto) {
    return this.fuelTypeService.create(dto);
  }

  @Get()
  findAll() {
    return this.fuelTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fuelTypeService.findOne(id);
  }
}
