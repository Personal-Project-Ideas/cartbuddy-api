import { ItemDto } from '@application/dto';

export interface ICreateListPort {
  execute(data: ItemDto[]): Promise<any>;
}
export const createListUseCase = Symbol('createListUseCase');
