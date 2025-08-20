import { User } from '@domain/entities';

export interface IUserRepositoryPort {
  create: (user: User) => Promise<User>;
  find: (username: string) => Promise<User | null>;
}
export const userRepository = Symbol('userRepository');
