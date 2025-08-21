import { ItemDto } from '@application/dto';
import { ItemEntity, ShoppingList } from '@domain/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ICreateListPort } from '@ports/inbound';
import {
  IUserRepositoryPort,
  userRepository,
} from '@ports/outbound/repositories/user-repository.port';

@Injectable()
export class CreateListUseCase implements ICreateListPort {
  constructor(
    @Inject(userRepository) private readonly _userRepo: IUserRepositoryPort,
  ) {
    // empty
  }
  execute(data: ItemDto[]): Promise<any> {
    const items = data.map((item) => new ItemEntity(item.item));
    const shoppingList = new ShoppingList(items);

    throw new Error('Not implemented');
  }
}
