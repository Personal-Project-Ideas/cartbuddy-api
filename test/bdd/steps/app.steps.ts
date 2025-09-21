import { afterAll, beforeAll, binding, then, when } from 'cucumber-tsflow';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createNestApp } from '@bdd/create-nest-app';
import { expect } from 'chai';
@binding()
export class UserSteps {
  private static app: INestApplication;
  private response: request.Response | undefined;

  @beforeAll()
  static async setupScenario() {
    this.app = await createNestApp();
  }

  @afterAll()
  public static async teardownApp() {
    await this.app.close();
    process.exit(0);
  }

  @when(/I send a POST request to create a user with body:/)
  async sendCreateUserRequest(body: string) {
    this.response = await request(UserSteps.app.getHttpServer())
      .post('/user/')
      .send(JSON.parse(body));
  }

  @when(/I send a GET request to fetch user with username "([^"]*)"/)
  async sendGetUserRequest(username: string) {
    this.response = await request(UserSteps.app.getHttpServer()).get(
      `/user/${username}`,
    );
  }

  @then(/the response status should be (\d+)/)
  checkStatus(status: string) {
    if (!this.response) throw new Error('Response not set');
    expect(this.response.status).to.be.equal(parseInt(status, 10));
  }
}
