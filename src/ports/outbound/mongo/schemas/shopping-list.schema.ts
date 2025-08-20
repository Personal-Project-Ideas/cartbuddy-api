import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';

import { Item, ItemSchema } from './item.schema';

@Schema({ timestamps: true })
export class ShoppingList {
  @Prop({ default: () => uuidV4(), unique: true })
  key: string;

  @Prop({ type: [ItemSchema], default: [] })
  items: Item[];
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);
