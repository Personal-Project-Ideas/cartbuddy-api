import { User } from '@domain/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserRepositoryPort } from '@ports/outbound/repositories/user-repository.port';
import { UserDocument } from '@ports/outbound/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository implements IUserRepositoryPort {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly _userModel: Model<UserDocument>,
  ) {
    //empty
  }

  async create(user: User): Promise<User> {
    throw new Error('Not implemented');
  }

  async find(username: string): Promise<User | null> {
    throw new Error('Not implemented');
  }
}
