import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class CreateCoverageDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsBoolean()
  is_mandatory: boolean;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price_per_day: number;
}

export class UpdateCoverageDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsBoolean()
  is_mandatory?: boolean;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price_per_day?: number;
}
