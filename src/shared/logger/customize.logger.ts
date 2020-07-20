import { Logger, Injectable, Scope } from '@nestjs/common';

// !transient scope, to ensure that we'll have a unique instance of the Logger in each feature module.
@Injectable({ scope: Scope.TRANSIENT })
// ! Techinque is to implement Logging not from scratch, but extending the built-in Logger class
export class CustomizeLogger extends Logger {
  error(message: string, trace?: string) {
    // !add your tailored logic here
    message += `Custome Message`;
    super.error(message, trace);
  }
}

// ! TRANSIENT Scope -> Print Time Stamp
