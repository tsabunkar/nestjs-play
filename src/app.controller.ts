import { Controller, Get, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cats')
  findAllCats(@Req() request: Request, @Body() reqBody: Request): string {
    // Req - access the request object of Express
    console.log(request.body);
    // it's not necessary to grab these properties manually.
    // We can use dedicated decorators instead, such as @Body() or @Query()
    // for complete list - [.assets/list-of-decorators]
    console.log('Request bodys is - ', reqBody);
    return `Resp - ${JSON.stringify(request.body)}`;
  }
}
