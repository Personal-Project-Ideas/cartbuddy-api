import { Module } from '@nestjs/common';
import { createListUseCase } from '@ports/inbound';

import { CreateListUseCaseImpl } from './use-cases/create-list-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [{ provide: createListUseCase, useClass: CreateListUseCaseImpl }],
  exports: [createListUseCase],
})
export class ApplicationModule {
  // empty
}
