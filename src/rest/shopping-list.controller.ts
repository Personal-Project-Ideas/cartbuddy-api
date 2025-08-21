import {
  Controller,
  Inject,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { ICreateListPort, createListUseCase } from '@ports/inbound';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(
    @Inject(createListUseCase)
    private readonly _createListUseCase: ICreateListPort,
  ) {
    // empty
  }

  @Post('/:username')
  async createShoppingList() {
    throw new NotImplementedException('Not implemented');
  }
}
