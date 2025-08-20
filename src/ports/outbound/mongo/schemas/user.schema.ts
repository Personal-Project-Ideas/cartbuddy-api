import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ShoppingList } from '@domain/entities';

import { ShoppingListSchema } from './shopping-list.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, type: [ShoppingListSchema], default: [] })
  shoppingLists: ShoppingList[];
}

export const UserSchema = SchemaFactory.createForClass(User);
