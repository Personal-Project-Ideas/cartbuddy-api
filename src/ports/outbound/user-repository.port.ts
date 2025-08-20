import { User } from './mongo/schemas/user.schema';

export interface IUserRepositoryPort {
  create: (user: any) => Promise<User>;
  find: (username: string) => Promise<User | null>;
}
