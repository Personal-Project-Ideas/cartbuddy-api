import { ItemEntity } from './item.entity';

//TODO: in the future when we have quantity, implement logic to group items with same name increasing quantity
export class ShoppingList {
  constructor(
    public items: ItemEntity[] = [],
    public key?: string,
  ) {
    //empty
  }

  addItem(item: ItemEntity) {
    this.items.push(item);
  }
}
