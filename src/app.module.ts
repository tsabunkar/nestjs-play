import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubDomainController } from './sub-domain/sub-domain.controller';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [],
  controllers: [AppController, SubDomainController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
