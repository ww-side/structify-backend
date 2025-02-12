import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing or invalid');
    }

    try {
      req.user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return true;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }

      throw new ForbiddenException('Invalid token');
    }
  }
}
