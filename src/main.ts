import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { loggerFunctMiddleware } from './middlewares/loggerFunctMiddleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(loggerFunctMiddleware); // this is a global middleware
  await app.listen(3000);
}
bootstrap();
