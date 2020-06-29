import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor() {
    super('My Custom Exception Class: Forbidden', HttpStatus.FORBIDDEN);
  }
}
