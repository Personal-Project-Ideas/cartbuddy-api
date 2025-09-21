import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  ShoppingListDocument,
  shoppingListSchema,
} from './shopping-list.schema';

@Schema({ timestamps: true })
export class UserDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, type: [shoppingListSchema], default: [] })
  shoppingLists?: ShoppingListDocument[];
}

export const userSchema = SchemaFactory.createForClass(UserDocument);

export type UserDocumentType = UserDocument;
