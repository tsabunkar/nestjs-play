import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { SharedModule } from 'src/shared/shared.module';

// ! FEATURE MODULE
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [SharedModule], // !Importing Shared module in this Feature Module
})
export class CatsModule {}
