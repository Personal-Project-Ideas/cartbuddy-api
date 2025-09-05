import { CreateListUseCase } from '@application/use-cases/create-list-use-case';
import { MongoInMemoryModule } from '@mocks/modules/mongo-mock.module';
import { createLoggerMock } from '@mocks/logger.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '@shared/logger/logger.service';

export const createAppTestModule = async (): Promise<TestingModule> => {
  const testModule = Test.createTestingModule({
    imports: [MongoInMemoryModule],
    providers: [CreateListUseCase],
  });

  const overrides = [{ provider: LoggerService, useValue: createLoggerMock() }];

  for (const { provider, useValue } of overrides) {
    testModule.overrideProvider(provider).useValue(useValue);
  }

  return testModule.compile();
};
