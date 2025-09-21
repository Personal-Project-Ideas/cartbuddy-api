import { User } from '@domain/entities';
import { UserDocument } from '@ports/outbound/schemas/user.schema';

import { ShoppingListMapper } from './shopping-list.mapper';

export class UserMapper {
  static toEntity(user: UserDocument): User {
    const lists =
      user.shoppingLists !== undefined && user.shoppingLists?.length > 0
        ? user?.shoppingLists?.map((l) => ShoppingListMapper.toEntity(l))
        : [];
    return new User(user.username, lists);
  }
}
