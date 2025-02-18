import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRowValueDTO {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  viewId: string;
}
