import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddlewareFun } from './core/logger.middleware';
import { CustomHttpExceptionFilter } from './core/http-exception.filter';
import { GlobalExceptionsFilter } from './core/global-exception.filter';
import { ValidationCustomPipe } from './core/pipe/validation-custom.pipe';

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

  // !Appying Global Level Pipe
  /* 
  app.useGlobalPipes(new ValidationCustomPipe());
 */

  await app.listen(3000);
}
bootstrap();
