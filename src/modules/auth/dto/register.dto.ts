import { IsNotEmpty, IsOptional, IsString } from '~/shared/lib/validation';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
