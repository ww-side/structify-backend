import { map } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(data => {
        const { message, statusCode, ...restData } = data;

        return {
          statusCode: statusCode ?? HttpStatus.OK,
          message,
          data: restData,
        };
      }),
    );
  }
}
