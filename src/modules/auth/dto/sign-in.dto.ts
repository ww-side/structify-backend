import { IsNotEmpty, IsString } from '~/shared/lib/validation';

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
