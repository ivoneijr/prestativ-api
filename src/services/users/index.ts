import { type User } from '@prisma/client';
import { prisma } from '../../db/prisma/client';
import { exclude, type UserWithoutPassword } from '../../entities/User';
import { ApiError } from '../../utils/api-error';
import { HTTP } from '../../utils/constants';
import { generateHash } from '../../utils/auth';

async function list(): Promise<User[]> {
  const users = await prisma.user.findMany();

  return users;
}

async function create(data: any): Promise<UserWithoutPassword> {
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
        password: await generateHash(data.password)
      }
    });

    return exclude(user, ['password']);
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    throw error?.message.includes('emailShouldBeUniqueUnique')
      ? new ApiError(HTTP.UNPROCESSABLE_ENTITY, 'Email already exist')
      : error;
  }
}

export default {
  list,
  create
};
