import { config as dotenvConfig } from 'dotenv';

import { IEnvVariables } from './interfaces/env-variables';

class LoadEnvService {
  public readonly vars: IEnvVariables;

  constructor() {
    dotenvConfig();

    this.vars = {
      PORT: this.getEnvVar('PORT'),
      DATABASE_URL: this.getEnvVar('DATABASE_URL'),
      JWT_SECRET: this.getEnvVar('JWT_SECRET'),
      NODE_ENV: this.getEnvVar('NODE_ENV'),
      REDIS_URL: this.getEnvVar('REDIS_URL'),
    };
  }

  private getEnvVar(key: keyof IEnvVariables): string {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(`Missing required env var: ${key}`);
    }
    return value;
  }

  get apiPort(): number {
    return parseInt(this.vars.PORT, 10);
  }

  get databaseUrl(): string {
    return this.vars.DATABASE_URL;
  }

  get jwtSecret(): string {
    return this.vars.JWT_SECRET;
  }

  get nodeEnv(): IEnvVariables['NODE_ENV'] {
    return this.vars.NODE_ENV;
  }

  get isProd(): boolean {
    return this.nodeEnv === 'production';
  }
}

export default new LoadEnvService();
