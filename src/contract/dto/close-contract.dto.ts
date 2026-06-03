import { FuelLevel } from '../../delivery/entities/delivery.entity';
import {
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';

export class CloseContractDto {
  // ─── Delivery return ──────────────────────────────────────
  @IsDateString()
  return_datetime: string;

  @IsInt()
  @Min(0)
  return_km: number;

  @IsEnum(FuelLevel)
  return_fuel: FuelLevel;

  // ─── Settlement deductions (opcionales) ───────────────────
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  advance_payment1?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  advance_payment2?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  voucher?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  expense_refund?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  stamp_tax?: number;
}
