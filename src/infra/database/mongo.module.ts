import { UserRepository } from '@adapters/outbound/repositories/user-repository.adapter';
import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userRepository } from '@ports/outbound/repositories/user-repository.port';
import {
  ShoppingListDocument,
  shoppingListSchema,
} from '@ports/outbound/schemas/shopping-list.schema';
import { UserDocument, userSchema } from '@ports/outbound/schemas/user.schema';
import { shoppingListRepository } from '@ports/outbound/repositories/shopping-list-repository.port';
import { ShoppingListRepository } from '@adapters/outbound/repositories/shopping-list-repository.adapter';

import { mongoDBProvider } from './mongo.provider';

@Module({})
export class MongoModule {
  static forRoot(): DynamicModule {
    return {
      module: MongoModule,
      imports: [
        mongoDBProvider,
        MongooseModule.forFeature([
          { name: UserDocument.name, schema: userSchema },
          { name: ShoppingListDocument.name, schema: shoppingListSchema },
        ]),
      ],
      providers: [
        { provide: userRepository, useClass: UserRepository },
        { provide: shoppingListRepository, useClass: ShoppingListRepository },
      ],
      exports: [userRepository, shoppingListRepository],
    };
  }
}
