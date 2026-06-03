import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';

@Controller('vehicle-types')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Post()
  create(@Body() dto: CreateVehicleTypeDto) {
    return this.vehicleTypeService.create(dto);
  }

  @Get()
  findAll() {
    return this.vehicleTypeService.findAll();
  }

  @Get('tree')
  findTree() {
    return this.vehicleTypeService.findTree();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleTypeService.findOne(id);
  }
}
