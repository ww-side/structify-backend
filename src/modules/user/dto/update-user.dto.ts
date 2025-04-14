import { IsEmail, IsOptional, IsString } from '~/shared/lib/validation';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  password: string;
}
