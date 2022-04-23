import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GameRecordsService } from '../services/gameRecords.service';

@Injectable()
export class ValidGameKeyPipe implements PipeTransform {
  constructor(private gamesDB: GameRecordsService) {}
  async transform(gameId: string) {
    function throwBadRequestException() {
      throw new BadRequestException('Game ID does not exist');
    }
    try {
      const existence = await this.gamesDB.existsGame(gameId);
      if (!existence) throwBadRequestException();
    } catch (err) {
      throwBadRequestException();
    }
    return gameId;
  }
}
