import { CirculationArea } from './../entities/contract.entity';
import {
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateContractDto {
  @IsNumber()
  client1Id: number;

  @IsOptional()
  @IsNumber()
  client2Id?: number;

  @IsOptional()
  @IsNumber()
  requesterId?: number;

  @IsNumber()
  vehicleId: number;

  @IsNumber()
  rateId: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  pickup_location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  return_location?: string;

  @IsOptional()
  @IsEnum(CirculationArea)
  circulation_area?: CirculationArea;

  @IsDateString()
  expected_return: string;

  @IsOptional()
  @IsDateString()
  extension_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  extension_authorized_by?: string;
}

export class UpdateContractDto {
  @IsOptional()
  @IsNumber()
  client1Id?: number;

  @IsOptional()
  @IsNumber()
  client2Id?: number;

  @IsOptional()
  @IsNumber()
  requesterId?: number;

  @IsOptional()
  @IsNumber()
  vehicleId?: number;

  @IsOptional()
  @IsNumber()
  rateId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  pickup_location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  return_location?: string;

  @IsOptional()
  @IsEnum(CirculationArea)
  circulation_area?: CirculationArea;

  @IsOptional()
  @IsDateString()
  expected_return?: string;

  @IsOptional()
  @IsDateString()
  extension_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  extension_authorized_by?: string;
}
