import { ShoppingList } from '@domain/entities';

export interface IShoppingListRepositoryPort {
  create: (list: ShoppingList) => Promise<ShoppingList>;
  findByKey: (key: string) => Promise<ShoppingList | null>;
}
export const shoppingListRepository = Symbol('shoppingListRepository');
