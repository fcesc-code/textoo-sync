import { Module } from '@nestjs/common';
import { GameRecordsService } from './services/gameRecords.service';
import { ScoresController } from './controllers/scores.controller';
import { GamesController } from './controllers/games.controller';
import { StatusController } from './controllers/status.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  providers: [GameRecordsService],
  controllers: [
    GamesController,
    ScoresController,
    StatusController,
    UsersController,
  ],
  exports: [GameRecordsService],
})
export class DatabaseModule {}
