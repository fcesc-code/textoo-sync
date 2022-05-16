import {
  Controller,
  Body,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  // UseGuards,
  // UsePipes,
} from '@nestjs/common';
import { GAMES_COLLECTION } from '../constants/collections';
import { GameRecordsService } from '../services/gameRecords.service';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidGameKeyPipe } from '../pipes/valid-key.game.pipe';

@Controller(GAMES_COLLECTION)
export class StatusController {
  constructor(private gamesDB: GameRecordsService) {}

  @Get('/live/status/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getGameStatusStream(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
  ): Promise<any[]> {
    const data = await this.gamesDB.listenGameStatus(gameId);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('/static/status/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getGameStatusOnce(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
  ): Promise<any> {
    const data = await this.gamesDB.getGameStatus(gameId);
    return res.status(HttpStatus.OK).json(data);
  }
  @Put('/static/status/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async updateGameRecord(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Body() changes: any,
  ): Promise<any> {
    const data = await this.gamesDB.updateGameStatus(gameId, changes.values);
    return res.status(HttpStatus.OK).json({
      message: 'Status successfully updated in game',
      status: data,
    });
  }
}
