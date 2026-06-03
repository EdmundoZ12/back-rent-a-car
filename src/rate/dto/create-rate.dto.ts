import { RateType } from './../entities/rate.entity';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsInt,
  Min,
} from 'class-validator';

export class CreateRateDto {
  @IsEnum(RateType)
  type: RateType;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsInt()
  @Min(0)
  tolerance_minutes: number;
}

export class UpdateRateDto {
  @IsOptional()
  @IsEnum(RateType)
  type?: RateType;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  tolerance_minutes?: number;
}
