import {
  Controller,
  Body,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  // UseGuards,
  // UsePipes,
} from '@nestjs/common';
import { GAMES_COLLECTION } from '../constants/collections';
import { GameRecordsService } from '../services/gameRecords.service';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidGameKeyPipe } from '../pipes/valid-key.game.pipe';
import { gameScore } from '../dtos/game.dto';

@Controller(GAMES_COLLECTION)
export class ScoresController {
  constructor(private gamesDB: GameRecordsService) {}

  @Get('/live/scores/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getGameScoresStream(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
  ): Promise<any[]> {
    const data = await this.gamesDB.listenGameScores(gameId);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('/static/scores/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getGameScoresOnce(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
  ): Promise<any> {
    const data = await this.gamesDB.getGameScores(gameId);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('/live/scores/:gameId/:userId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getGameUserScoresStream(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Param('userId') userId: string,
  ): Promise<any[]> {
    const data = await this.gamesDB.listenGameScore(gameId, userId);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('/static/scores/:gameId/:userId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getGameUserScoresOnce(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Param('userId') userId: string,
  ): Promise<any> {
    const data = await this.gamesDB.getGameScore(gameId, userId);
    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/static/scores/:gameId')
  async createGameScore(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Body() record: gameScore,
  ): Promise<any> {
    const data = await this.gamesDB.createGameScore(
      gameId,
      record.userId,
      record,
    );
    return res.status(HttpStatus.CREATED).json({
      message: 'Score successfully added to game',
      group: data,
    });
  }
}
