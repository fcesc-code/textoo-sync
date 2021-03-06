import {
  Controller,
  Body,
  Delete,
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

@Controller(GAMES_COLLECTION)
export class GamesController {
  constructor(private gamesDB: GameRecordsService) {}

  @Get('/live/game/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async listenGame(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
  ): Promise<any> {
    const data = await this.gamesDB.listenGame(gameId);
    return res.status(HttpStatus.OK).json({
      message: 'Game data was updated',
      game: data,
    });
  }

  @Get('/static/game/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getGame(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
  ): Promise<any> {
    const data = await this.gamesDB.getGame(gameId);
    return res.status(HttpStatus.OK).json({
      message: 'Game data',
      game: data,
    });
  }

  @Post('/static/game')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async createGame(
    @Res() res,
    @Param('gameId') gameId: string,
    @Body() game: any,
  ): Promise<any> {
    console.log('controler got it right, create game', game);
    const data = await this.gamesDB.createGame(gameId, game);
    return res.status(HttpStatus.CREATED).json({
      message: 'Game successfully created',
      game: data,
    });
  }

  @Delete('/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async deleteGame(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
  ): Promise<any> {
    const data = await this.gamesDB.deleteGame(gameId);
    return res.status(HttpStatus.OK).json({
      message: 'Game successfully deleted',
      game: data,
    });
  }
}
