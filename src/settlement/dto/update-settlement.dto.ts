import { PartialType } from '@nestjs/mapped-types';
import { CreateSettlementDto } from './create-settlement.dto';

export class UpdateSeattlementDto extends PartialType(CreateSettlementDto) {}
