import { IsNumber } from 'class-validator';

export class CreateContractCoverageDto {
  @IsNumber()
  contractId: number;

  @IsNumber()
  coverageId: number;
}
