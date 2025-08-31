import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '@shared/logger/logger.service';
import * as requestContext from '@config/context/request-context';
import pino from 'pino';

jest.mock('pino');

describe('LoggerService', () => {
  let loggerService: LoggerService;
  let mockLogger: any;

  beforeEach(async () => {
    jest
      .spyOn(requestContext, 'getRequestId')
      .mockReturnValue('mock-request-id');

    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };
    (pino as unknown as jest.Mock).mockReturnValue(mockLogger);

    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log info', () => {
    loggerService.info('test info', { foo: 'bar' });
    expect(mockLogger.info).toHaveBeenCalledWith(
      { requestId: 'mock-request-id', foo: 'bar' },
      'test info',
    );
  });

  it('should log error', () => {
    loggerService.error('test error', { foo: 'bar' });
    expect(mockLogger.error).toHaveBeenCalledWith(
      { requestId: 'mock-request-id', foo: 'bar' },
      'test error',
    );
  });

  it('should log warn', () => {
    loggerService.warn('test warn', { foo: 'bar' });
    expect(mockLogger.warn).toHaveBeenCalledWith(
      { requestId: 'mock-request-id', foo: 'bar' },
      'test warn',
    );
  });

  it('should log debug', () => {
    loggerService.debug('test debug', { foo: 'bar' });
    expect(mockLogger.debug).toHaveBeenCalledWith(
      { requestId: 'mock-request-id', foo: 'bar' },
      'test debug',
    );
  });

  it('should handle undefined obj', () => {
    loggerService.info('no obj');
    expect(mockLogger.info).toHaveBeenCalledWith(
      { requestId: 'mock-request-id' },
      'no obj',
    );
  });
});
