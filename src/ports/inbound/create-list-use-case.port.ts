import { ItemDto } from '@application/dto';
import { ShoppingList } from '@domain/entities';

export interface ICreateListPort {
  execute(data: ItemDto[], username: string): Promise<ShoppingList>;
}
export const createListUseCase = Symbol('createListUseCase');
