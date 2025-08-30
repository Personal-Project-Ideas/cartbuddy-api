import { Controller, Get, HttpCode, Req, Res } from '@nestjs/common';
import { LoggerService } from '@shared/logger/logger.service';
import { Request, Response } from 'express';

@Controller()
export class HealthController {
  constructor(private readonly _logger: LoggerService) {
    this._logger.info(this.constructor.name);
  }

  @Get('health')
  @HttpCode(200)
  health(@Req() request: Request, @Res() response: Response) {
    this._logger.info(`${this.constructor.name}.health.call`, {
      method: request.method,
      path: request.path,
      status: 'ok',
    });
    response.json({ status: 'ok' });
  }
}
