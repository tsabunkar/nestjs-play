import { Module } from '@nestjs/common';
import { CustomizeLogger } from './customize.logger';

@Module({
  providers: [CustomizeLogger],
  exports: [CustomizeLogger],
})
export class CustomLoggerModule {}
