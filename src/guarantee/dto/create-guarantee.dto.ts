import {
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateGuaranteeDto {
  @IsNumber()
  contractId: number;

  @IsString()
  @MaxLength(20)
  card_number: string;

  @IsString()
  @MaxLength(100)
  bank_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

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

export class UpdateGuaranteeDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  card_number?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  bank_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

  @IsOptional()
  @IsDateString()
  valid_until?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  pa_code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  security_code?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  value_bs?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  card_type?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
