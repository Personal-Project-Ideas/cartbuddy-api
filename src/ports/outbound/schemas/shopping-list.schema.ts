import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';

import { ItemDocument, itemSchema } from './item.schema';

@Schema({ timestamps: true })
export class ShoppingListDocument {
  @Prop({ default: () => uuidV4(), unique: true })
  key: string;

  @Prop({ type: [itemSchema], default: [] })
  items: ItemDocument[];
}

export const shoppingListSchema =
  SchemaFactory.createForClass(ShoppingListDocument);
export type ShoppingListDocumentType = ShoppingListDocument & Document;
