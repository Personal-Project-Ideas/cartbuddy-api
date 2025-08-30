import {
  Controller,
  Inject,
  NotImplementedException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ICreateListPort, createListUseCase } from '@ports/inbound';
import { LoggerService } from '@shared/logger/logger.service';
import { Request } from 'express';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(
    @Inject(createListUseCase)
    private readonly _createListUseCase: ICreateListPort,
    private readonly _logger: LoggerService,
  ) {
    this._logger.info(this.constructor.name);
  }

  @Post('/v1/:username')
  async createShoppingList(
    @Param('username') username: string,
    // @Body() body: any,
    @Req() request: Request,
  ) {
    this._logger.info(`${this.constructor.name}.createShoppingList.call`, {
      method: request.method,
      path: request.path,
      body: { username },
    });
    throw new NotImplementedException('Not implemented');
  }
}
