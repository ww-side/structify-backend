import { IsNotEmpty, IsString } from '~/shared/lib/validation';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
