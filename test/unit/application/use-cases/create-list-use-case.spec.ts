import { ItemDto } from '@application/dto';
import { CreateListUseCase } from '@application/use-cases/create-list-use-case';
import { ShoppingList } from '@domain/entities';
import { createAppTestModule } from '@mocks/modules/main-app-mock.module';
import { TestingModule } from '@nestjs/testing';
import {
  IShoppingListRepositoryPort,
  shoppingListRepository,
} from '@ports/outbound/repositories/shopping-list-repository.port';
import {
  IUserRepositoryPort,
  userRepository,
} from '@ports/outbound/repositories/user-repository.port';

describe('CreateListUseCase', () => {
  let useCase: CreateListUseCase;
  let moduleRef: TestingModule;
  let userRepo: IUserRepositoryPort;
  let listRepo: IShoppingListRepositoryPort;
  let itemDto: ItemDto[];
  const username = 'testuser@example.com';
  beforeAll(async () => {
    moduleRef = await createAppTestModule();
    useCase = moduleRef.get(CreateListUseCase);
    userRepo = moduleRef.get(userRepository);
    listRepo = moduleRef.get(shoppingListRepository);
    itemDto = [
      {
        name: 'item 1',
        price: 10,
        description: 'description 1',
      },
      {
        name: 'item 2',
        price: 20,
        description: 'description 2',
      },
    ];
  });

  it('should return the created shopping list', async () => {
    expect.assertions(1);
    listRepo.create = jest
      .fn()
      .mockResolvedValue({ items: itemDto } as ShoppingList);
    const response = await useCase.execute(itemDto, username);
    expect(response).toEqual({ items: itemDto } as ShoppingList);
  });

  it('should throw an error if creation fails', async () => {
    expect.assertions(2);
    listRepo.create = jest.fn().mockRejectedValue(new Error('Creation failed'));
    try {
      const response = await useCase.execute(itemDto, username);
      await expect(response).rejects.toThrow('Creation failed');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Creation failed');
    }
  });
});
