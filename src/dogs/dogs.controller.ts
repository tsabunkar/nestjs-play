import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  Post,
  Body,
  UsePipes,
  DefaultValuePipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { JoiValidationPipe } from 'src/core/pipe/joi-validation.pipe';
import { CreateDogSchemaValidtor } from 'src/core/helpers/create-dog.validators';
import { AuthGuard } from 'src/core/auth/auth.guard';
import { RoleGuard } from 'src/core/auth/role.guard';
import { Roles } from 'src/core/auth/roles.decorator';
import { LoggingInterceptor } from 'src/core/interceptor/logging.interceptor';
import { TransformInterceptor } from 'src/core/interceptor/transform.interceptor';
import { ExcludeNullInterceptor } from 'src/core/interceptor/null.interceptor';
import { ErrorsInterceptor } from 'src/core/interceptor/errors.interceptor';
import { CustomizeLogger } from 'src/shared/logger/customize.logger';

@Controller('api/dogs')
export class DogsController {
  constructor(
    private dogsService: DogsService,
    private customizeLogger: CustomizeLogger,
  ) {}

  // ?http://localhost:3000/api/dogs
  @Get()
  dogTestController(): string {
    return `Test Method of Dog Controller`;
  }

  //?  http://localhost:3000/api/dogs/pipe1/23 or http://localhost:3000/api/dogs/pipe1/dgf
  // !ParseIntPipe -> method handler parameter is converted to a JavaScript integer
  // ! (or throws an exception if the conversion fails)
  @Get('pipe1/:dogId')
  pipe1(@Param('dogId', ParseIntPipe) id: number): string {
    return `${id} value is parsed to Data-Type -> ${typeof id} using ParseIntPipe`;
  }

  //?  http://localhost:3000/api/dogs/pipe2?dogId=23
  // ! Customizeing Builtin Pipe
  @Get('pipe2')
  pipe2(
    @Query(
      'dogId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    // ! IF Error then ->  "statusCode": 406 (NOT_ACCEPTABLE)
    return `${id} value is parsed to Data-Type -> ${typeof id} using ParseIntPipe`;
  }

  // ? http://localhost:3000/api/dogs/pipe3/81dd51c6-fd7a-4a21-89fa-ec91aafd7d62
  @Get('pipe3/:uuidVal')
  pipe3(
    @Param('uuidVal', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): string {
    return `uuid value is -> ${uuid}`;
  }

  // ? http://localhost:3000/api/dogs/joi
  @Post('joi')
  @UsePipes(new JoiValidationPipe(CreateDogSchemaValidtor)) // !Bind custom pipes to this method
  joiSchemaValidation(@Body() createDogDto: CreateDogDto): string {
    return `Joi Validation ${JSON.stringify(createDogDto)}`;
  }

  //?  http://localhost:3000/api/dogs/default?dogId=23 or
  //? http://localhost:3000/api/dogs/default?dogId  <- Key must be specified then default value be consider as 13
  // ! Providing default value pipe
  @Get('default')
  transformationPipe(
    @Query('dogId', new DefaultValuePipe(13), new ParseIntPipe()) id: number,
  ): string {
    return `${id} value is parsed to Data-Type -> ${typeof id} using ParseIntPipe`;
  }

  // ? http://localhost:3000/api/dogs/guard
  // !Binding Guard
  @Get('gaurd')
  @UseGuards(AuthGuard)
  guardFoo(): string {
    return `Success!!`;
  }

  // ? http://localhost:3000/api/dogs/role
  // !Creating custom Roles Decorator and Implementing Role based Authorization
  // ?RequestBody
  /* {
    "user" : {
    "roles": "admin"
    }
  } */
  @Get('role')
  @Roles('admin')
  @UseGuards(RoleGuard)
  roleFoo(): string {
    return `Success!!`;
  }

  // ? http://localhost:3000/api/dogs/interceptor
  @Get('interceptor')
  @UseInterceptors(LoggingInterceptor)
  interceptFoo(): string {
    return `works!!`;
  }

  // ? http://localhost:3000/api/dogs/transforminterceptor
  @Get('transforminterceptor')
  @UseInterceptors(TransformInterceptor)
  transforminterceptorFoo(): string {
    return `transforminterceptor works!!`;
  }

  // ? http://localhost:3000/api/dogs/nullinterceptor
  @Get('nullinterceptor')
  @UseInterceptors(ExcludeNullInterceptor)
  nullinterceptorFoo(): string {
    return `nullinterceptor works!!`;
  }

  // ? http://localhost:3000/api/dogs/errorinterceptor
  @Get('errorinterceptor')
  @UseInterceptors(ErrorsInterceptor)
  errorinterceptorFoo(): string {
    return `errorinterceptor works!!`;
  }

  // ? http://localhost:3000/api/dogs/logs
  @Get('logs')
  customizeLoggerFoo(): string {
    this.customizeLogger.error(`${Object}`);
    return `Test Logger`;
  }
}
