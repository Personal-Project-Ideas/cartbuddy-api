// src/config/mongo.provider.ts
import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import envService from '@config/env.service';

export const MongoDBProvider: DynamicModule = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: envService.databaseUrl,
  }),
});
