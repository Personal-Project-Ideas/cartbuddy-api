import { ItemDto } from '@application/dto';
import { ItemEntity, ShoppingList } from '@domain/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ICreateListPort } from '@ports/inbound';
import {
  IShoppingListRepositoryPort,
  shoppingListRepository,
} from '@ports/outbound/repositories/shopping-list-repository.port';
import {
  IUserRepositoryPort,
  userRepository,
} from '@ports/outbound/repositories/user-repository.port';
import { LoggerService } from '@shared/logger/logger.service';

@Injectable()
export class CreateListUseCase implements ICreateListPort {
  constructor(
    @Inject(userRepository) private readonly _userRepo: IUserRepositoryPort,
    @Inject(shoppingListRepository)
    private readonly _shoppingListRepo: IShoppingListRepositoryPort,
    private readonly _logger: LoggerService,
  ) {
    this._logger.info(this.constructor.name);
  }
  async execute(data: ItemDto[], username: string): Promise<ShoppingList> {
    try {
      // const user = await this._userRepo.find(username);

      // if (!user) {
      //   throw new Error(`User ${username} not found`);
      // }
      const items = data.map(
        (item) => new ItemEntity(item.name, item.price, item.description),
      );

      const shoppingList = new ShoppingList(items);
      const result = await this._shoppingListRepo.create(shoppingList);

      return result;
    } catch (error: unknown) {
      this._logger.error(`${this.constructor.name}.execute.error`, {
        error,
        username,
        data,
      });
      throw error;
    }
  }
}
