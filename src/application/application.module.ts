import { Module } from '@nestjs/common';
import { createListUseCase } from '@ports/inbound';
import { MongoModule } from '@config/database/mongo.module';

import { CreateListUseCase } from './use-cases/create-list-use-case';

@Module({
  imports: [MongoModule.forRoot()],
  controllers: [],
  providers: [{ provide: createListUseCase, useClass: CreateListUseCase }],
  exports: [createListUseCase],
})
export class ApplicationModule {
  // empty
}
