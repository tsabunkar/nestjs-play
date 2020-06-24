import { Injectable } from '@nestjs/common';

@Injectable()
export class FooService {
  fooHelper(name: string): string {
    return `${name} This is helper function from Shared module`;
  }
}
