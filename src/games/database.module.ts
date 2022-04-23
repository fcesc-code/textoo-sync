import { Module } from '@nestjs/common';
import { GameRecordsService } from './services/gameRecords.service';
import { RecordsController } from './controllers/records.controller';
import { GamesController } from './controllers/games.controller';

@Module({
  providers: [GameRecordsService],
  controllers: [GamesController, RecordsController],
  exports: [GameRecordsService],
})
export class DatabaseModule {}
