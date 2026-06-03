import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryDto } from './create-delivery.dto';
import { IsDateString, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { FuelLevel } from '../entities/delivery.entity';

export class UpdateDeliveryDto {
  @IsOptional()
  @IsDateString()
  return_datetime?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  return_km?: number;

  @IsOptional()
  @IsEnum(FuelLevel)
  return_fuel?: FuelLevel;
}
