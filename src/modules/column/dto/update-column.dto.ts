import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateColumnDTO } from './create-column.dto';

export class UpdateColumnDTO extends PartialType(
  OmitType(CreateColumnDTO, ['viewId'] as const),
) {}
