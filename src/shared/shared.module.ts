import { Module } from '@nestjs/common';
import { FooService } from './foo/foo.service';
import { CustomLoggerModule } from './logger/custom-logger.module';
import { CustomizeLogger } from './logger/customize.logger';

// ! Define all the shared providers/services here, like-
// ! helpers functions
@Module({
  imports: [CustomLoggerModule],
  providers: [FooService, CustomizeLogger],
  exports: [FooService, CustomizeLogger],
})
export class SharedModule {}
