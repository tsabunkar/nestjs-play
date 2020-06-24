import { Injectable } from '@nestjs/common';
import { CreateCatDto } from 'src/dto/create-cat.dto';
import { FooService } from 'src/shared/foo/foo.service';

// ! Since it is a service so @Injectable -> Decorator
@Injectable()
export class CatsService {
  constructor(private fooService: FooService) {}
  createCat(createCatDto: CreateCatDto): string {
    const transformedName = this.fooService.fooHelper(createCatDto.name);
    return `Cat Transformed name is - ${transformedName} for ${JSON.stringify(
      createCatDto,
    )} had been added to list`;
  }
}
