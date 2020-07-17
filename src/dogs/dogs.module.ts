import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [DogsController],
  providers: [DogsService],
  imports: [SharedModule], // !Importing Shared module in this Feature Module
})
export class DogsModule {}
