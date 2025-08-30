import {
  Controller,
  Get,
  NotImplementedException,
  Post,
  Req,
} from '@nestjs/common';
import { LoggerService } from '@shared/logger/logger.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly _logger: LoggerService) {
    this._logger.info(this.constructor.name);
  }
  @Post('/')
  async createUser(@Req() request: Request) {
    this._logger.info(`${this.constructor.name}.createUser.call`, {
      method: request.method,
      path: request.path,
    });
    throw new NotImplementedException('Not implemented');
  }

  @Get('/:username')
  async getUser(@Req() request: Request) {
    this._logger.info(`${this.constructor.name}.getUser.call`, {
      method: request.method,
      path: request.path,
    });
    throw new NotImplementedException('Not implemented');
  }
}
