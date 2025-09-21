import { ShoppingList } from '@domain/entities';
import { InjectModel } from '@nestjs/mongoose';
import { IShoppingListRepositoryPort } from '@ports/outbound/repositories/shopping-list-repository.port';
import { ShoppingListDocument } from '@ports/outbound/schemas/shopping-list.schema';
import { Model } from 'mongoose';

import { ShoppingListMapper } from '../mappers';

export class ShoppingListRepository implements IShoppingListRepositoryPort {
  constructor(
    @InjectModel(ShoppingListDocument.name)
    private readonly _shoppingListModel: Model<ShoppingListDocument>,
  ) {
    //empty
  }

  async create(list: ShoppingList): Promise<ShoppingList> {
    const createdList = await this._shoppingListModel.create(list);
    return ShoppingListMapper.toEntity(createdList);
  }

  async findByKey(key: string): Promise<ShoppingList | null> {
    const foundList = await this._shoppingListModel.findById(key);
    return foundList ? ShoppingListMapper.toEntity(foundList) : null;
  }
}
