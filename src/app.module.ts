import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { LoggerModule } from '@shared/logger/logger.module';
import { UserController } from '@rest/controller/user.controller';
import { ShoppingListController } from '@rest/controller/shopping-list.controller';
import { HealthController } from '@rest/controller/health.controller';
import { RequestIdMiddleware } from '@rest/middleware/request-id.middleware';

@Module({
  imports: [ApplicationModule, LoggerModule],
  controllers: [UserController, ShoppingListController, HealthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*path');
  }
}
