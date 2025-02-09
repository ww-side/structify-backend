import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ResponseFormatInterceptor } from '~/shared/interceptors/response-format';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
