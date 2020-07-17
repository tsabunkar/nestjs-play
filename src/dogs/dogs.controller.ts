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
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { JoiValidationPipe } from 'src/core/pipe/joi-validation.pipe';
import { CreateDogSchemaValidtor } from 'src/core/helpers/create-dog.validators';

@Controller('api/dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  //?  http://localhost:3000/api/dogs/pipe1/23 or http://localhost:3000/api/dogs/pipe1/dgf
  // !ParseIntPipe -> method handler parameter is converted to a JavaScript integer
  // ! (or throws an exception if the conversion fails)
  @Get('pipe1/:dogId')
  pipe1(@Param('dogId', ParseIntPipe) id: number) {
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
  ) {
    // ! IF Error then ->  "statusCode": 406 (NOT_ACCEPTABLE)
    return `${id} value is parsed to Data-Type -> ${typeof id} using ParseIntPipe`;
  }

  // ? http://localhost:3000/api/dogs/pipe3/81dd51c6-fd7a-4a21-89fa-ec91aafd7d62
  @Get('pipe3/:uuidVal')
  pipe3(@Param('uuidVal', new ParseUUIDPipe({ version: '4' })) uuid: string) {
    return `uuid value is -> ${uuid}`;
  }

  // ? http://localhost:3000/api/dogs/joi
  @Post('joi')
  @UsePipes(new JoiValidationPipe(CreateDogSchemaValidtor)) // !Bind custom pipes to this method
  joiSchemaValidation(@Body() createDogDto: CreateDogDto) {
    return `Joi Validation ${JSON.stringify(createDogDto)}`;
  }
}
