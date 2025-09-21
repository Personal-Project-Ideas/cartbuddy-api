import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserRepository } from '@adapters/outbound/repositories/user-repository.adapter';
import { userRepository } from '@ports/outbound/repositories/user-repository.port';
import {
  ShoppingListDocument,
  shoppingListSchema,
} from '@ports/outbound/schemas/shopping-list.schema';
import { UserDocument, userSchema } from '@ports/outbound/schemas/user.schema';
import { shoppingListRepository } from '@ports/outbound/repositories/shopping-list-repository.port';
import { ShoppingListRepository } from '@adapters/outbound/repositories/shopping-list-repository.adapter';

@Module({})
export class MongoInMemoryModule {
  static async forRoot(): Promise<DynamicModule> {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    return {
      module: MongoInMemoryModule,
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: UserDocument.name, schema: userSchema },
          { name: ShoppingListDocument.name, schema: shoppingListSchema },
        ]),
      ],
      providers: [
        { provide: userRepository, useClass: UserRepository },
        { provide: shoppingListRepository, useClass: ShoppingListRepository },
        { provide: MongoMemoryServer, useValue: mongod },
      ],
      exports: [userRepository, shoppingListRepository, MongoMemoryServer],
    };
  }
}
