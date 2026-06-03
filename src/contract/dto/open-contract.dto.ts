import { FuelLevel } from '../../delivery/entities/delivery.entity';
import { CirculationArea } from '../entities/contract.entity';
import {
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsArray,
  IsPositive,
  IsInt,
  MaxLength,
  Min,
} from 'class-validator';

export class OpenContractDto {
  // ─── Step 1 — Client ──────────────────────────────────────
  @IsNumber()
  client1Id: number;

  @IsOptional()
  @IsNumber()
  client2Id?: number;

  @IsOptional()
  @IsNumber()
  requesterId?: number;

  // ─── Step 2 — Vehicle & Rate ──────────────────────────────
  @IsNumber()
  vehicleId: number;

  @IsNumber()
  rateId: number;

  // ─── Step 3 — Contract details ────────────────────────────
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

  @IsDateString()
  departure_datetime: string;

  @IsInt()
  @Min(0)
  departure_km: number;

  @IsEnum(FuelLevel)
  departure_fuel: FuelLevel;

  // ─── Step 4 — Coverages ───────────────────────────────────
  @IsArray()
  @IsNumber({}, { each: true })
  coverageIds: number[];

  // ─── Step 4 — Guarantee ───────────────────────────────────
  @IsString()
  @MaxLength(20)
  card_number: string;

  @IsString()
  @MaxLength(100)
  bank_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  guarantee_location?: string;

  @IsDateString()
  valid_until: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  pa_code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  security_code?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  value_bs: number;

  @IsString()
  @MaxLength(50)
  card_type: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
