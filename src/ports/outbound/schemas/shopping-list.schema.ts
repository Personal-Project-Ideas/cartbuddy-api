import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';

import { Item, itemSchema } from './item.schema';

@Schema({ timestamps: true })
export class ShoppingList {
  @Prop({ default: () => uuidV4(), unique: true })
  key: string;

  @Prop({ type: [itemSchema], default: [] })
  items: Item[];
}

export const shoppingListSchema = SchemaFactory.createForClass(ShoppingList);
export type ShoppingListocument = ShoppingList & Document;
