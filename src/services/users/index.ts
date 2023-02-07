import { type User } from '@prisma/client';
import { prisma } from '../../db/prisma/client';

async function list(): Promise<User[]> {
  const users = await prisma.user.findMany();

  return users;
}

export default {
  list
};
