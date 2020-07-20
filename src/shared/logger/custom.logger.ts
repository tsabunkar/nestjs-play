import { LoggerService } from '@nestjs/common';

// ! Techinque is to implement Logging from Scratch- by completely overriding LoggerService
export class CustomLogger implements LoggerService {
  log(message: string): any {
    /* your implementation */
    console.log((message = `Custom String - ${message}`));
  }
  error(message: string, trace: string) {
    /* your implementation */
  }
  warn(message: string) {
    /* your implementation */
  }
  debug(message: string) {
    /* your implementation */
  }
  verbose(message: string) {
    /* your implementation */
  }
}
