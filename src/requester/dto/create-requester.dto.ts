import { IsNumber, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateRequesterDto {
  @IsNumber()
  personId: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  cell_phone?: string;
}

export class UpdateRequesterDto {
  @IsOptional()
  @IsNumber()
  personId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  cell_phone?: string;
}
