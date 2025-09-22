import { ShoppingList } from '@domain/entities';
import { ShoppingListDocument } from '@ports/outbound/schemas/shopping-list.schema';

import { ItemMapper } from '.';

export class ShoppingListMapper {
  static toEntity(list: ShoppingListDocument): ShoppingList {
    const items = list.items.map((i) => ItemMapper.toEntity(i));
    return new ShoppingList(items, list?.key);
  }
}
