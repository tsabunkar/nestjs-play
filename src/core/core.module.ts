import {
  Module,
  Global,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware, loggerMiddlewareFun } from './logger.middleware';
/*eslint-disable */
const cors = require('cors');
/*eslint-enable */

// !Define all Core providers/services here, like-
// !database connections (Which is almost be used by all modules)
// @Global() <-- NOTE RECOMMENDED, rather use imports and exports array
@Module({
  imports: [],
  exports: [],
})
export class CoreModule {
  // !Applying Middleware at Class level Route
  /* 
  configure(consumer: MiddlewareConsumer): void {
    // forRoutes() value -> class level route of controller
    consumer.apply(LoggerMiddleware).forRoutes('v1');
  }
 */
  // !Applying Middleware at Specific method level Route
  /* 
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'v1/good', method: RequestMethod.GET });
  } 
  */
  // !Applying Middleware at Specific method level Route Wildcards
  /* 
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'v1/f*s', method: RequestMethod.GET });
  }
   */
  /**
   * - apply() method may either take a single middleware, or multiple arguments to specify
   *   multiple middlewares.
   * - Exclude certain routes form the controller while applying middleware (below ex)
   *
   */
  /* 
  configure(consumer: MiddlewareConsumer): void {
    // !forRoutes() value -> also provide Controller name
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'g*d', method: RequestMethod.GET },
        { path: 'cat', method: RequestMethod.POST }, // exclude certain route with specific HTTP req method
        'cats/(.*)', // exclude certain route
      )
      .forRoutes(CatsController); // since this controller is not exported so this error
  } 
  */
  // !Applying functional Middleware instead of Class middleware as in above
  /*
   configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(loggerMiddlewareFun)
      .forRoutes({ path: 'v1/f*s', method: RequestMethod.GET });
  }
  */
  // ! Apply Multiple Middleware i.e- cors() and loggerMiddlewareFun
  /* 
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors(), loggerMiddlewareFun).forRoutes('v1');
  }
   */
}
