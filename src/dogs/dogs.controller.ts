import { Controller, Get } from '@nestjs/common';

@Controller('api/dogs')
export class DogsController {
  @Get()
  test() {
    return `Hello Dogs`;
  }
}
