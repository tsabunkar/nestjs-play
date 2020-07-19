import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return true;
    const request = context.switchToHttp().getRequest();
    console.log(request);
    return this.validateRequest(request);
  }

  validateRequest(request: Request): boolean {
    if (request) {
      // ! Logic ->  extract and validate the token, and use the extracted information
      // ! to determine whether the request can proceed or not.
      return true; // !request will be processed.
    } else {
      return false; //!Nest will deny the request. (Authorization Failed)
    }
  }
}
