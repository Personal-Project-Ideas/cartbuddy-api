import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ApplicationModule } from '@application/application.module';
import { ApplicationTestModule } from '@mocks/application-test.module';

import { AppModule } from '../../src/app.module';

export async function createNestApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideModule(ApplicationModule)
    .useModule(ApplicationTestModule)
    .compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
}
