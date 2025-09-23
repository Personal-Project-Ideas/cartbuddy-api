import { afterAll, beforeAll, binding, then, when } from 'cucumber-tsflow';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createNestApp } from '@bdd/create-nest-app';

@binding()
export class UserSteps {
  private app: INestApplication;
  private response: request.Response;

  @beforeAll()
  private async initApp() {
    if (!this.app) {
      this.app = await createNestApp();
    }
  }
  @afterAll()
  public async closeApp() {
    if (this.app) await this.app.close();
    process.exit(0);
  }

  @when(/I send a POST request to create a user with body:/)
  public async sendPostRequestDocString(docString: string) {
    await this.initApp();
    this.response = await request(this.app.getHttpServer())
      .post('/users') // endpoint correspondente
      .send(JSON.parse(docString));
  }

  @when(/I send a GET request to fetch user with username "(.*)"/)
  public async sendGetRequest(username: string) {
    await this.initApp();
    this.response = await request(this.app.getHttpServer()).get(
      `/users/${username}`,
    );
  }

  @then(/the response status should be (\d+)/)
  public async checkStatus(status: number) {
    if (this.response.status !== Number(status)) {
      throw new Error(
        `Expected status ${status}, but got ${this.response.status}`,
      );
    }
  }
}
