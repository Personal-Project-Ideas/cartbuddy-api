import { ItemEntity, ShoppingList } from '@domain/entities';
import { createAppTestModule } from '@mocks/modules/main-app-mock.module';
import { TestingModule } from '@nestjs/testing';
import {
  IShoppingListRepositoryPort,
  shoppingListRepository,
} from '@ports/outbound/repositories/shopping-list-repository.port';

describe('ShoppingListRepository', () => {
  let repo: IShoppingListRepositoryPort;
  let moduleRef: TestingModule;
  let list: ShoppingList;
  let item1: ItemEntity;
  let item2: ItemEntity;

  beforeAll(async () => {
    moduleRef = await createAppTestModule();
    repo = moduleRef.get(shoppingListRepository);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('Create', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      item1 = new ItemEntity('item 1', 10, 'description 1');
      item2 = new ItemEntity('item 2', 20, 'description 2');
      list = new ShoppingList([item1, item2]);
    });
    it('should create a shopping list', async () => {
      expect.assertions(6);
      const created = await repo.create(list);
      expect(created.items).toEqual(list.items);
      expect(created.items).toHaveLength(2);
      expect(created.items).toContainEqual(item1);
      expect(created.items).toContainEqual(item2);
      expect(created.key).toBeDefined();
      expect(created).toBeInstanceOf(ShoppingList);
    });

    it('should throw an error if creation fails', async () => {
      expect.assertions(2);
      list = new ShoppingList([]);
      try {
        const created = await repo.create(list);
        expect(created).toBeNull();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('list can not be empty');
      }
    });
  });

  describe('FindByKey', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      item1 = new ItemEntity('item 1', 10, 'description 1');
      item2 = new ItemEntity('item 2', 20, 'description 2');
      list = new ShoppingList([item1, item2]);
    });

    it('should find a shopping list by key', async () => {
      expect.assertions(2);
      const created = await repo.create(list);
      const found = await repo.findByKey(String(created.key));
      expect(found).not.toBeNull();
      expect(found).toBeInstanceOf(ShoppingList);
    });
  });
});
