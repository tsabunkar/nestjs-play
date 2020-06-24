import { Injectable } from '@nestjs/common';
import { CreateCatDto } from 'src/dto/create-cat.dto';

// ! Since it is a service so @Injectable -> Decorator
@Injectable()
export class CatsService {
  createCat(createCatDto: CreateCatDto): string {
    return `Cat ${JSON.stringify(createCatDto)} had been added to list`;
  }
}
