import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';

import { UserController } from './rest/user.controller';
import { ShoppingListController } from './rest/shopping-list.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController, ShoppingListController],
})
export class AppModule {
  // empty
}
