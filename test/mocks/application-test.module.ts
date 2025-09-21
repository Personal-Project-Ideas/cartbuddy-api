import { Module } from '@nestjs/common';
import { CreateListUseCase } from '@application/use-cases/create-list-use-case';
import { createListUseCase } from '@ports/inbound';

import { MongoInMemoryModule } from './modules/mongo-mock.module';

@Module({
  imports: [MongoInMemoryModule.forRoot()],
  providers: [{ provide: createListUseCase, useClass: CreateListUseCase }],
  exports: [createListUseCase],
})
export class ApplicationTestModule {
  // empty
}
