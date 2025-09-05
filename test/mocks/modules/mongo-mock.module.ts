import { UserRepository } from '@adapters/outbound/repositories/user-repository.adapter';
import { ShoppingList, User } from '@domain/entities';
import { Module, OnApplicationShutdown } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userRepository } from '@ports/outbound/repositories/user-repository.port';
import { shoppingListSchema } from '@ports/outbound/schemas/shopping-list.schema';
import { userSchema } from '@ports/outbound/schemas/user.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongod = await MongoMemoryServer.create();
        MongoInMemoryModule.mongod = mongod;
        return { uri: mongod.getUri() };
      },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: ShoppingList.name, schema: shoppingListSchema },
    ]),
  ],
  providers: [{ provide: userRepository, useClass: UserRepository }],
  exports: [userRepository],
})
export class MongoInMemoryModule implements OnApplicationShutdown {
  static mongod: MongoMemoryServer;

  async onApplicationShutdown(_signal?: string) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (MongoInMemoryModule.mongod) {
      await MongoInMemoryModule.mongod.stop();
    }
  }
}
