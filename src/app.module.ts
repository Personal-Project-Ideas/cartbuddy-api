import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { MongoModule } from '@config/database/mongo.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongoModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // empty
}
