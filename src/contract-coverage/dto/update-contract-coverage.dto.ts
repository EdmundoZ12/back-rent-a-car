import { PartialType } from '@nestjs/mapped-types';
import { CreateContractCoverageDto } from './create-contract-coverage.dto';

export class UpdateContractCoverageDto extends PartialType(CreateContractCoverageDto) {}
