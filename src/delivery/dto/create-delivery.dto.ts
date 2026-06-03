import { FuelLevel } from './../entities/delivery.entity';
import {
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';

export class CreateDeliveryDto {
  @IsNumber()
  contractId: number;

  @IsDateString()
  departure_datetime: string;

  @IsInt()
  @Min(0)
  departure_km: number;

  @IsEnum(FuelLevel)
  departure_fuel: FuelLevel;
}


