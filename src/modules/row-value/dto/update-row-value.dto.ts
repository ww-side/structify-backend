import { IsString } from 'class-validator';

export class UpdateRowValueDTO {
  @IsString()
  value: string;
}
