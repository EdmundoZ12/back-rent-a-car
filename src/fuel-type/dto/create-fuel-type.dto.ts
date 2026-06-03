import {
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class CreateFuelTypeDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price_per_liter: number;
}

export class UpdateFuelTypeDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price_per_liter?: number;
}
