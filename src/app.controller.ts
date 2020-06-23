import { Controller, Get, Req, Body, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cats')
  findAllCats(@Req() request: Request): string {
    // Req - access the request object of Express
    console.log(request.body);
    return `Resp - ${JSON.stringify(request.body)}`;
  }

  /**
   * it's not necessary to grab these properties manually.
   * We can use dedicated decorators instead, such as @Body() or @Query()
   * for complete list - [.assets/list-of-decorators]
   */
  @Get('cats1')
  findAllCats1(@Body() reqBody: Request): string {
    console.log('Request bodys is - ', reqBody);
    return `Resp - ${JSON.stringify(reqBody)}`;
  }

  // http://localhost:3000/cats2?name=tejas&age=25
  @Get('cats2')
  findAllCats2(@Query() reqQuery: Request, @Res() response: Response): void {
    console.log('Request Query is - ', reqQuery);
    // return `Resp - ${JSON.stringify(reqQuery)}`;
    /**
     * Nest into Library-specific mode for that handler,  and you become responsible
     * for managing the response.
     * @Res or @Response()
     */
    response.send(reqQuery);
  }
}
