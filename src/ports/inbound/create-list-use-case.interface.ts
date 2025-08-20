import { ItemDto } from '@application/dto';

export interface ICreateList {
  execute(data: ItemDto[]): Promise<any>;
}
export const CreateListUseCase = Symbol('CreateListUseCase');
