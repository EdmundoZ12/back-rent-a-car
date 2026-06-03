import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @MaxLength(150)
  full_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  id_card?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  id_card_city?: string;

  @IsOptional()
  @IsDateString()
  id_card_expiry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  license_number?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  license_city?: string;

  @IsOptional()
  @IsDateString()
  license_expiry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  passport_number?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  passport_country?: string;

  @IsOptional()
  @IsDateString()
  passport_expiry?: string;

  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  cell_phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  work_address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  work_phone?: string;

  @IsOptional()
  @IsBoolean()
  is_foreign?: boolean;
}

export class UpdatePersonDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  full_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  id_card?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  id_card_city?: string;

  @IsOptional()
  @IsDateString()
  id_card_expiry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  license_number?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  license_city?: string;

  @IsOptional()
  @IsDateString()
  license_expiry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  passport_number?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  passport_country?: string;

  @IsOptional()
  @IsDateString()
  passport_expiry?: string;

  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  cell_phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  work_address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  work_phone?: string;

  @IsOptional()
  @IsBoolean()
  is_foreign?: boolean;
}
