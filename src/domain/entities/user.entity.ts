import { ShoppingList } from './shopping-list.entity';

export class User {
  constructor(
    public username: string,
    public shoppingLists: ShoppingList[] = [],
  ) {
    // empty constructor
  }
}
