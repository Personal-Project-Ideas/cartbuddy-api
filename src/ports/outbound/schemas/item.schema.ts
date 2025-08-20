import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item {
  @Prop({ required: true })
  item: string;
}

export const itemSchema = SchemaFactory.createForClass(Item);
export type ItemDocument = Item & Document;
