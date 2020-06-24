import { Module, Global } from '@nestjs/common';

// !Define all Core providers/services here, like-
// !database connections (Which is almost be used by all modules)
// @Global() <-- NOTE RECOMMENDED, rather use imports and exports array
@Module({
  imports: [],
  exports: [],
})
export class CoreModule {}
