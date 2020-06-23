import { Controller, Get } from '@nestjs/common';

/* 
Specifies an optional HTTP Request host filter. 
When configured, methods within the controller will only be
routed if the request host matches the specified value.
*/

@Controller({ host: 'admin.example.com' })
export class SubDomainController {
  // http:// admin.example.com
  @Get()
  index(): string {
    return 'Dogs page';
  }
}
