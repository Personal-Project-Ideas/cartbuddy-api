import { CreateListUseCase } from '@application/use-cases/create-list-use-case';
import { createAppTestModule } from '@mocks/modules/application-mock.module';
import { TestingModule } from '@nestjs/testing';

describe('CreateListUseCase', () => {
  let useCase: CreateListUseCase;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await createAppTestModule();
    useCase = moduleRef.get(CreateListUseCase);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('should return error cause its not implemented', async () => {
    try {
      await useCase.execute([]);
    } catch (error) {
      expect(error).toEqual(new Error('Not implemented'));
    }
  });
});
