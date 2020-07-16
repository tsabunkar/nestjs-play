import {
  Controller,
  Get,
  Req,
  Body,
  Query,
  Res,
  Post,
  HttpCode,
  Header,
  Redirect,
  Param,
  HttpException,
  HttpStatus,
  UseFilters,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from 'src/dto/create-cat.dto';
import { CatsService } from './cats.service';
import { CustomException } from 'src/core/custom.exception';
import { CustomHttpExceptionFilter } from 'src/core/http-exception.filter';
import { AllExceptionsFilter } from 'src/core/all-exception.filter';

@Controller('v1')
export class CatsController {
  constructor(private catsService: CatsService) {}

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

  // http://localhost:3000/v1/cats2?name=tejas&age=25
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

  @Post('cat')
  @Header('name', 'sabunkar') // !Response Header, using Standard not Library-specific (express)
  postNewCat(): string {
    return `This is Post HTTP request`;
  }

  // http://localhost:3000/v1/good  or http://localhost:3000/v1/god
  @Get('g*d')
  @HttpCode(204) //  status code is always 200 by default, except for POST requests which are 201.
  findAllWildcard(): string {
    return 'This route uses a wildcard';
  }

  // http://localhost:3000/v1/docs --Redirected_to-->  https://docs.nestjs.com (with StatusCode-302)
  // http://localhost:3000/v1/docs?version=5  ---> https://google.com
  // http://localhost:3000/v1/docs?version=7  ---> https://docs.nestjs.com
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: Request | string): void | { url: string } {
    if (version && version === '5') {
      return { url: 'https://google.com' };
    }
  }

  // http://localhost:3000/v1/cats/1 or http://localhost:3000/v1/cats/250
  @Get('cats/:id')
  findOneCat(@Param() params: { id: string }): string {
    console.log(typeof params.id, 'value', params.id);
    return `This action returns a #${params.id} cat`;
  }

  // http://localhost:3000/v1/cats/kaali/250
  /* 
  @Get('cats/:name/:id')
  findOneCat2(@Param() params: { id: string; name: string }): string {
    console.log(typeof params.name, 'value', params.name);
    return `This action returns a #${params.id} cat, whose name is - ${params.name}`;
  }
 */
  // ! or

  @Get('cats/:name/:id')
  findOneCat3(@Param('id') id: string, @Param('name') name: string): string {
    console.log(typeof name, 'value', name);
    return `This action returns a #${id} cat, whose name is - ${name}`;
  }

  // http://localhost:3000/v1/foos
  @Get('foos')
  async findAllFoo(): Promise<any[]> {
    return [
      {
        cat: 'cat1',
      },
      {
        cat: 'cat2',
      },
      { cat: 'cat3' },
    ];
  }

  // http://localhost:3000/v1/lists
  @Get('lists')
  findAllObservables(): Observable<any[]> {
    return of([
      {
        cat: 'cat1',
      },
      {
        cat: 'cat2',
      },
      { cat: 'cat3' },
    ]);
  }

  // http://localhost:3000/v1/newCat
  @Post('newCat')
  createNewCate(@Body() createCatDto: CreateCatDto): string {
    return this.catsService.createCat(createCatDto);
  }

  // http://localhost:3000/v1/excep
  @Get('excep')
  async exceptionTest(): Promise<void> {
    // !Explicitly throwing Forbidden
    /* 
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
     */
    // ! To override the response as per desired structure

    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `This is a custom message for Forbidden`,
        body: {},
      },
      HttpStatus.FORBIDDEN,
    );
  }

  // http://localhost:3000/v1/excep2
  @Get('excep2')
  async exceptionTest2(): Promise<void> {
    // ! Writing Custom exception in separate class
    /* 
    throw new CustomException();
    */

    throw new CustomHttpExceptionFilter();
  }

  // http://localhost:3000/v1/excep3
  // !Binding Custom Exception filter with a particular method
  @Post('excep3')
  // @UseFilters(new CustomHttpExceptionFilter())
  @UseFilters(CustomHttpExceptionFilter) // ! or we can pass the class (instead of an instance)
  async createCat() {
    throw new ForbiddenException();
  }

  // http://localhost:3000/v1/allexcep
  @Get('allexcep')
  @UseFilters(AllExceptionsFilter)
  async allException(): Promise<void> {
    throw new ForbiddenException();
  }
}
