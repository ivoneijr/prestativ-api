import { type User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;

export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete user[key];
  }
  return user;
}
