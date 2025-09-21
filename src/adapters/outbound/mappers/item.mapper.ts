import { ItemEntity } from '@domain/entities';
import { ItemDocument } from '@ports/outbound/schemas/item.schema';

export class ItemMapper {
  static toEntity(item: ItemDocument): ItemEntity {
    return new ItemEntity(item.name, item.price, item.description);
  }

  static toDocument(item: ItemEntity): Partial<ItemDocument> {
    return {
      name: item.name,
      price: item.price,
      description: item.description,
    };
  }
}
