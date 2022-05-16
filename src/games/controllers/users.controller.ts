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
import { gameUser } from '../dtos/game.dto';

@Controller(GAMES_COLLECTION)
export class UsersController {
  constructor(private gamesDB: GameRecordsService) {}

  @Get('/live/users/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getGameUsersStream(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
  ): Promise<any[]> {
    const data = await this.gamesDB.listenUsersInGame(gameId);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('/static/users/:gameId/:userId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getGameScoresOnce(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Param('userId') userId: string,
  ): Promise<any> {
    const data = await this.gamesDB.checkUserInGame(gameId, userId);
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

  @Post('/static/users/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async addUserToGame(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Body() user: gameUser,
  ): Promise<any> {
    const data = await this.gamesDB.addUserToGame(gameId, user);
    return res.status(HttpStatus.CREATED).json({
      message: 'User successfully added to game',
      user: data,
    });
  }

  @Delete('/static/users/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async removeUserFromGame(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Param('userId') userId: string,
  ): Promise<any> {
    const data = await this.gamesDB.removeUserFromGame(gameId, userId);
    return res.status(HttpStatus.OK).json({
      message: 'User successfully removed from game',
      user: data,
    });
  }
}
