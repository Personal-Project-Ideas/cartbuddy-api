import { getRequestId } from '@config/context/request-context';
import { Injectable } from '@nestjs/common';
import pino, { Logger } from 'pino';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = pino({
      transport: { target: 'pino-pretty' },
      timestamp: pino.stdTimeFunctions.isoTime,
    });
  }

  private buildLogObject(obj?: unknown) {
    return {
      requestId: getRequestId(),
      ...(typeof obj === 'object' && obj !== null ? obj : {}),
    };
  }

  info(message: string, obj?: unknown) {
    this.logger.info(this.buildLogObject(obj), message);
  }

  error(message: string, obj?: unknown) {
    this.logger.error(this.buildLogObject(obj), message);
  }

  warn(message: string, obj?: unknown) {
    this.logger.warn(this.buildLogObject(obj), message);
  }

  debug(message: string, obj?: unknown) {
    this.logger.debug(this.buildLogObject(obj), message);
  }
}
