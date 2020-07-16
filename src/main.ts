import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddlewareFun } from './core/logger.middleware';
import { CustomHttpExceptionFilter } from './core/http-exception.filter';
import { GlobalExceptionsFilter } from './core/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // !Appying Global Level Middleware
  /* 
  app.use(loggerMiddlewareFun);
 */

  // !Appying Global Level Exception
  /* 
  app.useGlobalFilters(new CustomHttpExceptionFilter());
   */

  /* 
  app.useGlobalFilters(new GlobalExceptionsFilter());
 */
  await app.listen(3000);
}
bootstrap();
