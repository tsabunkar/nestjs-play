import { Module } from '@nestjs/common';
import { FooService } from './foo/foo.service';

// ! Define all the shared providers/services here, like-
// ! helpers functions
@Module({
  providers: [FooService],
  exports: [FooService],
})
export class SharedModule {}
