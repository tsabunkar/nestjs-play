import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubDomainController } from './sub-domain/sub-domain.controller';
import { CatController } from './cat/cat.controller';

@Module({
  imports: [],
  controllers: [AppController, SubDomainController, CatController],
  providers: [AppService],
})
export class AppModule {}
