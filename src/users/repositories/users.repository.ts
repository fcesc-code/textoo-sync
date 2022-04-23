import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewUserDto, UserDto } from '../dtos/users.dtos';
import { DB_USERS_COLLECTION } from '../../KEYS/BBDD.KEYS';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(DB_USERS_COLLECTION)
    private UserModel: Model<UserDto>,
  ) {}

  async findById(id: string): Promise<UserDto> {
    const data = await this.UserModel.findById(id).exec();
    return data;
  }

  async findByEmail(email: string): Promise<UserDto> {
    const data = await this.UserModel.findOne({ email }).exec();
    return data;
  }

  async exists(user: NewUserDto): Promise<boolean> {
    const aliasExists = await this.UserModel.findOne({
      alias: user.alias,
    }).exec();
    return aliasExists ? true : false;
  }
}
