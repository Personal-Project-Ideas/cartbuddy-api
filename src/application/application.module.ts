import { Module } from '@nestjs/common';
import { CreateListUseCase } from '@ports/inbound';

import { CreateListUseCaseImpl } from './use-cases/create-list-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [{ provide: CreateListUseCase, useClass: CreateListUseCaseImpl }],
  exports: [CreateListUseCase],
})
export class ApplicationModule {}
