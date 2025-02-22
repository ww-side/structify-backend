import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '~/shared/lib/validation';

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

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
