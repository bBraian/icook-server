import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exceptions-filter/prisma.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaExceptionFilter())

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422
    })
  )

  await app.listen(3000);
}
bootstrap();
