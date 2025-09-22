import { ShoppingList } from '@domain/entities';
import { InjectModel } from '@nestjs/mongoose';
import { IShoppingListRepositoryPort } from '@ports/outbound/repositories/shopping-list-repository.port';
import { ShoppingListDocument } from '@ports/outbound/schemas/shopping-list.schema';
import { Model } from 'mongoose';
import { LoggerService } from '@shared/logger/logger.service';

import { ShoppingListMapper } from '../mappers';

export class ShoppingListRepository implements IShoppingListRepositoryPort {
  constructor(
    @InjectModel(ShoppingListDocument.name)
    private readonly _shoppingListModel: Model<ShoppingListDocument>,
    private readonly _logger: LoggerService,
  ) {
    this._logger.info(this.constructor.name);
  }

  async create(list: ShoppingList): Promise<ShoppingList> {
    this._logger.debug(`${this.constructor.name}.create.call`, { list });
    try {
      if (list.items.length === 0) {
        throw new Error('list can not be empty');
      }
      const createdList = await this._shoppingListModel.create(list);

      const entity = ShoppingListMapper.toEntity(createdList);

      this._logger.debug(`${this.constructor.name}.create.result`, { entity });

      return entity;
    } catch (error: unknown) {
      this._logger.error(`${this.constructor.name}.create.error`, {
        error,
        list,
      });
      throw error;
    }
  }

  async findByKey(key: string): Promise<ShoppingList | null> {
    this._logger.debug(`${this.constructor.name}.findByKey.call`, {
      key: String(key),
    });
    try {
      const foundList = await this._shoppingListModel.findOne({ key });

      const list = foundList ? ShoppingListMapper.toEntity(foundList) : null;

      this._logger.debug(`${this.constructor.name}.findByKey.result`, { list });

      return list;
    } catch (error: unknown) {
      this._logger.error(`${this.constructor.name}.findByKey.error`, {
        error,
        key,
      });
      throw error;
    }
  }
}
