import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

// ! example for Class Middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    console.log(':: Request Class Middleware ::');
    next();
  }
}

// ! example for Functional Middleware
export function loggerMiddlewareFun(
  req: Request,
  res: Response,
  next: () => void,
): void {
  console.log(`:: Request Functional Middleware ::`);
  next();
}
