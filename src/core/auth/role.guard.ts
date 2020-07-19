import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  // !comparing the roles assigned to the current user to the actual roles required by
  // !the current route being processed. In order to access the route's role(s)
  // !(custom metadata), we'll use the Reflector helper class
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return true;
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.body.user;
    if (this.matchRoles(roles, user.roles)) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }

  matchRoles(roles: string[], currentRole: string): boolean {
    console.log(currentRole);
    return roles.some(role => role === currentRole) ? true : false;
  }
}
