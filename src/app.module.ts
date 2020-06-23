import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubDomainController } from './sub-domain/sub-domain.controller';

@Module({
  imports: [],
  controllers: [AppController, SubDomainController],
  providers: [AppService],
})
export class AppModule {}
