import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getTokenFromAuthHeader, TokenMeta } from '~/shared/lib/token';

@Injectable()
export class HeaderManagerService {
  constructor(private readonly jwtService: JwtService) {}

  getUserIdFromRequest(req: Request): string {
    const token = getTokenFromAuthHeader(req.headers['authorization']);
    return this.jwtService.decode<TokenMeta>(token).id;
  }
}
