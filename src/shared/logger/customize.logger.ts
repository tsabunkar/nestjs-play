import { Logger, Injectable } from '@nestjs/common';

@Injectable()
// ! Techinque is to implement Logging not from scratch, but extending the built-in Logger class
export class CustomizeLogger extends Logger {
  error(message: string, trace?: string) {
    // !add your tailored logic here
    message += `Custome Message`;
    super.error(message, trace);
  }
}
