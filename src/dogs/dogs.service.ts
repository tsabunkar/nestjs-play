import { Injectable } from '@nestjs/common';
import { CustomizeLogger } from 'src/shared/logger/customize.logger';

@Injectable()
export class DogsService {
  constructor(private customizeLogger: CustomizeLogger) {
    this.customizeLogger.setContext('DogsService');
  }

  customizeLoggerTransientScope(): void {
    this.customizeLogger.error('HELLO ERROR');
  }
}
