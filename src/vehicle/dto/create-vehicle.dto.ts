import {
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class CreateVehicleDto {
  @IsNumber()
  vehicleTypeId: number;

  @IsNumber()
  fuelTypeId: number;

  @IsString()
  @MaxLength(100)
  brand: string;

  @IsString()
  @MaxLength(50)
  color: string;

  @IsString()
  @MaxLength(20)
  plate: string;

  @IsString()
  @MaxLength(50)
  code: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  tank_capacity: number;
}

export class UpdateVehicleDto {
  @IsOptional()
  @IsNumber()
  vehicleTypeId?: number;

  @IsOptional()
  @IsNumber()
  fuelTypeId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  brand?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  color?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  plate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  code?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  tank_capacity?: number;
}
