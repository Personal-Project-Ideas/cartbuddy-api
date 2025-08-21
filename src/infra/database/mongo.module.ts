import { UserRepository } from '@adapters/outbound/repositories/user-repository.adapter';
import { ShoppingList } from '@domain/entities';
import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userRepository } from '@ports/outbound/repositories/user-repository.port';
import { shoppingListSchema } from '@ports/outbound/schemas/shopping-list.schema';
import { User, userSchema } from '@ports/outbound/schemas/user.schema';

import { mongoDBProvider } from './mongo.provider';

@Module({})
export class MongoModule {
  static forRoot(): DynamicModule {
    return {
      module: MongoModule,
      imports: [
        mongoDBProvider,
        MongooseModule.forFeature([
          { name: User.name, schema: userSchema },
          { name: ShoppingList.name, schema: shoppingListSchema },
        ]),
      ],
      providers: [{ provide: userRepository, useClass: UserRepository }],
      exports: [userRepository],
    };
  }
}
