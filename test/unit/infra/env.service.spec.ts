import envService from '@config/env.service';
import LoadEnvServiceClass from '@config/env.service';
import { IEnvVariables } from '@config/interfaces/env-variables';

describe('LoadEnvService', () => {
  let ENV: IEnvVariables;

  beforeEach(() => {
    jest.resetModules();
    ENV = {
      PORT: '3000',
      DATABASE_URL: 'postgres://user:pass@localhost:5432/db',
      JWT_SECRET: 'supersecret',
      NODE_ENV: 'production',
      REDIS_URL: 'redis://localhost:6379',
    };
    process.env = { ...ENV };
  });

  function createEnvService(): typeof envService {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return new LoadEnvServiceClass.constructor();
  }

  it('should load all env variables', () => {
    const envService = createEnvService();
    expect(envService.vars).toEqual(ENV);
  });

  it('should return apiPort as number', () => {
    const envService = createEnvService();
    expect(envService.apiPort).toBe(3000);
  });

  it('should return databaseUrl', () => {
    const envService = createEnvService();
    expect(envService.databaseUrl).toBe(ENV.DATABASE_URL);
  });

  it('should return jwtSecret', () => {
    const envService = createEnvService();
    expect(envService.jwtSecret).toBe(ENV.JWT_SECRET);
  });

  it('should return nodeEnv', () => {
    const envService = createEnvService();
    expect(envService.nodeEnv).toBe(ENV.NODE_ENV);
  });

  it('should return isProd true for production', () => {
    const envService = createEnvService();
    expect(envService.isProd).toBe(true);
  });

  it('should return isProd false for non-production', () => {
    process.env.NODE_ENV = 'development';
    const envService = createEnvService();
    expect(envService.isProd).toBe(false);
  });
});
