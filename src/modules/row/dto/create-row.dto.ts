import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRowDTO {
  @IsString()
  @IsNotEmpty()
  viewId: string;
}
