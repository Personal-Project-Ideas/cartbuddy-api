import { ShoppingList } from '@domain/entities';

export interface IShoppingListRepositoryPort {
  create: (list: ShoppingList) => Promise<any>;
  findByKey: (key: string) => Promise<any | null>;
}
export const shoppingListRepository = Symbol('shoppingListRepository');
