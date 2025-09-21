import { ItemDto } from '@application/dto';

export interface ICreateListPort {
  execute(data: ItemDto[], username: string): Promise<any>;
}
export const createListUseCase = Symbol('createListUseCase');
