import { ListDto, ShoppingListDto } from '@application/dto';
import {
  Body,
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
    @Body() body: ListDto,
    @Req() request: Request,
  ): Promise<ShoppingListDto> {
    this._logger.info(`${this.constructor.name}.createShoppingList.call`, {
      method: request.method,
      path: request.path,
      body: { username },
    });
    try {
      const createdList = await this._createListUseCase.execute(
        body.items,
        username,
      );

      this._logger.info(`${this.constructor.name}.createShoppingList.result`, {
        createdList,
      });

      return {
        list: createdList.items,
        username,
      };
    } catch (error: unknown) {
      this._logger.error(`${this.constructor.name}.createShoppingList.error`, {
        error,
      });
    }
    throw new NotImplementedException('Not implemented');
  }
}
