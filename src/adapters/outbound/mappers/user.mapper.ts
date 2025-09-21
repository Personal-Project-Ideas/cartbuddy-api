import { User } from '@domain/entities';
import { UserDocument } from '@ports/outbound/schemas/user.schema';

export class UserMapper {
  static toEntity(user: UserDocument): User {
    return new User(user.username);
  }
}
