import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserRepository } from '@adapters/outbound/repositories/user-repository.adapter';
import { ShoppingList } from '@domain/entities';
import { userRepository } from '@ports/outbound/repositories/user-repository.port';
import { shoppingListSchema } from '@ports/outbound/schemas/shopping-list.schema';
import { User, userSchema } from '@ports/outbound/schemas/user.schema';

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
          { name: User.name, schema: userSchema },
          { name: ShoppingList.name, schema: shoppingListSchema },
        ]),
      ],
      providers: [
        { provide: userRepository, useClass: UserRepository },
        { provide: MongoMemoryServer, useValue: mongod },
      ],
      exports: [userRepository, MongoMemoryServer],
    };
  }
}
