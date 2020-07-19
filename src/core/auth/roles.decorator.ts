import { SetMetadata, CustomDecorator } from '@nestjs/common';

// ! Creating Custom Decorator
export const Roles = (...roles: string[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
