import { Module } from '@nestjs/common';
import { MongoDBProvider } from '@config/database/mongo.provider';
import { ApplicationModule } from '@application/application.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongoDBProvider, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // empty
}
