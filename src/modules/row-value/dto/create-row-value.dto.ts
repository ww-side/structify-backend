import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRowValueDTO {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  rowId: string;

  @IsString()
  @IsNotEmpty()
  columnId: string;

  @IsString()
  @IsNotEmpty()
  viewId: string;
}
