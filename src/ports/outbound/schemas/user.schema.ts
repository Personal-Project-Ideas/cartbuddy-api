import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ShoppingList } from '@domain/entities';

import { shoppingListSchema } from './shopping-list.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, type: [shoppingListSchema], default: [] })
  shoppingLists: ShoppingList[];
}

export const userSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
