import { DataType } from '~/modules/column/types/data-type';

import { IsArray, IsIn, IsOptional, IsString } from '~/shared/lib/validation';

export class CreateColumnDTO {
  @IsString()
  name: string;

  @IsString()
  viewId: string;

  @IsString()
  @IsIn(['select', 'multiselect', 'text', 'number', 'date'])
  dataType: DataType;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  variants: string[];
}
