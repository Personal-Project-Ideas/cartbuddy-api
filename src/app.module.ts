import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { LoggerModule } from '@shared/logger/logger.module';

import { UserController } from './rest/controllers/user.controller';
import { ShoppingListController } from './rest/controllers/shopping-list.controller';
import { RequestIdMiddleware } from './rest/middlewares/request-id.middleware';
import { HealthController } from './rest/controllers/health.controller';

@Module({
  imports: [ApplicationModule, LoggerModule],
  controllers: [UserController, ShoppingListController, HealthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*path');
  }
}
