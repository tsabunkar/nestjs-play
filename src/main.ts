import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddlewareFun } from './core/logger.middleware';
import { CustomHttpExceptionFilter } from './core/http-exception.filter';
import { GlobalExceptionsFilter } from './core/global-exception.filter';
import { ValidationCustomPipe } from './core/pipe/validation-custom.pipe';
import { RoleGuard } from './core/auth/role.guard';
import { LoggingInterceptor } from './core/interceptor/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './shared/logger/custom.logger';
import { CustomizeLogger } from './shared/logger/customize.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ! Inorder to enable Basic builtin-logging
  /*  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  }); */
  //
  // !Custom Logger Class
  /* 
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
 */

  // ! Inorder to make sure our application initialize CustomLoggerModule ->
  // ! Onces i.e- Single Instance of CustomizeLogger Service
  app.useLogger(app.get(CustomizeLogger));

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

  // !Appying Global Level Guard
  /* 
  app.useGlobalGuards(new RoleGuard());
 */

  // !Appying Global Level Interceptor
  /* 
  app.useGlobalInterceptors(new LoggingInterceptor());
 */

  // !Appying Global Level Builtin-Pipe for Validation
  /* 
  app.useGlobalPipes(new ValidationPipe());
 */
  await app.listen(3000);
}
bootstrap();
