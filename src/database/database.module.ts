import { Module } from '@nestjs/common';
import { DBService } from './services/db.service';

@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DatabaseModule {}
