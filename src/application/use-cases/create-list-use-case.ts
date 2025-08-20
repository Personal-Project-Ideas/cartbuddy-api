import { ItemDto } from '@application/dto';
import { ItemEntity, ShoppingList } from '@domain/entities';
import { ICreateList } from '@ports/inbound';

export class CreateListUseCaseImpl implements ICreateList {
  execute(data: ItemDto[]): Promise<any> {
    const items = data.map((item) => new ItemEntity(item.item));
    const shoppingList = new ShoppingList(items);

    throw new Error('Not implemented');
  }
}
