import { CreateRequesterDto } from './dto/create-requester.dto';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { RequesterService } from './requester.service';

@Controller('requesters')
export class RequesterController {
  constructor(private readonly requesterService: RequesterService) {}

  @Post()
  create(@Body() dto: CreateRequesterDto) {
    return this.requesterService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.requesterService.findOne(id);
  }

  @Get('person/:personId')
  findByPerson(@Param('personId', ParseIntPipe) personId: number) {
    return this.requesterService.findByPerson(personId);
  }
}
