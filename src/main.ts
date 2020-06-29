import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddlewareFun } from './core/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // !Appying Global Level Middleware
  /* 
  app.use(loggerMiddlewareFun);
 */
  await app.listen(3000);
}
bootstrap();
