import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import envService from 'src/infra/env.service';

export const mongoDBProvider: DynamicModule = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: envService.databaseUrl,
  }),
});
