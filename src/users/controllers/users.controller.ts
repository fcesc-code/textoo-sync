import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DB_USERS_COLLECTION } from 'src/KEYS/BBDD.KEYS';
import { UsersRepository } from '../repositories/users.repository';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidUserIdPipe } from '../pipes/valid-user-id.pipe';
import { UserDto } from '../dtos/users.dtos';

@Controller(DB_USERS_COLLECTION)
export class UsersController {
  constructor(private userDB: UsersRepository) {}

  @Get('/:userId')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getUser(
    @Res() res,
    @Param('userId', ValidUserIdPipe) userId: string,
  ): Promise<UserDto> {
    const data = await this.userDB.findById(userId);
    return res.status(HttpStatus.OK).json(data);
  }
}
