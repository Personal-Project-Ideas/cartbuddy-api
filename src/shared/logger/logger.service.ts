/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Injectable } from '@nestjs/common';
import pino, { Logger } from 'pino';

@Injectable()
export class AppLogger {
  private readonly logger: Logger;
  private context?: string;

  constructor() {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: true },
      },
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  private formatMessage(message: string) {
    return this.context != null ? `[${this.context}] ${message}` : message;
  }

  info(message: string, obj?: unknown) {
    this.logger.info(obj || {}, this.formatMessage(message));
  }

  error(message: string, obj?: unknown) {
    this.logger.error(obj || {}, this.formatMessage(message));
  }

  warn(message: string, obj?: unknown) {
    this.logger.warn(obj || {}, this.formatMessage(message));
  }

  debug(message: string, obj?: unknown) {
    this.logger.debug(obj || {}, this.formatMessage(message));
  }
}
