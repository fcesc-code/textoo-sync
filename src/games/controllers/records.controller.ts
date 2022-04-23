import {
  Controller,
  Body,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  // UseGuards,
  // UsePipes,
} from '@nestjs/common';
import { RECORDS_COLLECTION } from '../constants/collections';
import { GameRecordsService } from '../services/gameRecords.service';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidGameKeyPipe } from '../pipes/valid-key.game.pipe';

@Controller(RECORDS_COLLECTION)
export class RecordsController {
  constructor(private gamesDB: GameRecordsService) {}

  @Get('/all')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getAllGameRecords(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
  ): Promise<any[]> {
    const data = await this.gamesDB.getAll(gameId);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async getGameRecord(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Body() record: any,
  ): Promise<any> {
    const data = await this.gamesDB.get(gameId, record.id as string);
    return res.status(HttpStatus.OK).json(data);
  }

  @Post()
  async addGameRecord(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Body() record: any,
  ): Promise<any> {
    const data = await this.gamesDB.create(gameId, record);
    return res.status(HttpStatus.CREATED).json({
      message: 'Record successfully added to game',
      group: data,
    });
  }

  @Delete('/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async removeGameRecord(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Body() record: any,
  ): Promise<any> {
    const data = await this.gamesDB.delete(gameId, record.id as string);
    return res.status(HttpStatus.OK).json({
      message: 'Record successfully removed from game',
      group: data,
    });
  }

  @Put('/:gameId')
  // @ApiBearerAuth('access_token')
  // @UseGuards(AuthGuard('jwt'))
  async updateGameRecord(
    @Res() res,
    @Param('gameId', ValidGameKeyPipe) gameId: string,
    @Body() changes: any,
  ): Promise<any> {
    const data = await this.gamesDB.update(
      gameId,
      changes.id as string,
      changes.values,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Record successfully updated in game',
      group: data,
    });
  }
}
