import { CreateListUseCase } from '@application/use-cases/create-list-use-case';
import { createAppTestModule } from '@mocks/modules/main-app-mock.module';
import { TestingModule } from '@nestjs/testing';

describe('CreateListUseCase', () => {
  let useCase: CreateListUseCase;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await createAppTestModule();
    useCase = moduleRef.get(CreateListUseCase);
  });

  it('should return error cause its not implemented', async () => {
    try {
      await useCase.execute([]);
    } catch (error) {
      expect(error).toEqual(new Error('Not implemented'));
    }
  });
});
