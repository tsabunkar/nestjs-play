import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubDomainController } from './sub-domain/sub-domain.controller';
import { CatsModule } from './cats/cats.module';
// import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CatsModule,
    // SharedModule, // ! No need to specifiy here, since no1 is consuming this module in App Module
    CoreModule,
  ],
  controllers: [
    AppController,
    SubDomainController,
    // CatsController
  ],
  providers: [
    AppService,
    // CatsService
  ],
})
export class AppModule {}
