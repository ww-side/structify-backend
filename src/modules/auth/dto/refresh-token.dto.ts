import { IsNotEmpty, IsString } from '~/shared/lib/validation';

export class RefreshTokenDTO {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
