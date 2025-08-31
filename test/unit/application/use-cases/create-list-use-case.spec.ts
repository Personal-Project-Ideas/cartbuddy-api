import { CreateListUseCase } from '@application/use-cases/create-list-use-case';
import { createLoggerMock } from '@mocks/logger.mock';
import { MongoInMemoryModule } from '@mocks/mongo-mock.module';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '@shared/logger/logger.service';

describe('CreateListUseCase', () => {
  let useCase: CreateListUseCase;
  let moduleRef: TestingModule;
  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [MongoInMemoryModule],
      providers: [CreateListUseCase],
    })
      .overrideProvider(LoggerService)
      .useValue(createLoggerMock())
      .compile();

    useCase = moduleRef.get<CreateListUseCase>(CreateListUseCase);
  });
  afterAll(async () => {
    await moduleRef.close(); // ⚡ fecha todas as conexões do Nest/Mongoose
  });

  it('should return  error cause its not implemented', async () => {
    try {
      await useCase.execute([]);
    } catch (error) {
      expect(error).toEqual(new Error('Not implemented'));
    }
  });
});
