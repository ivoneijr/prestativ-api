import { type User } from '@prisma/client';
import { prisma } from '../../db/client';
import { ApiError } from '../../utils/api-error';
import { HTTP } from '../../utils/constants';
import { generateHash } from '../../utils/auth';

async function list(): Promise<User[]> {
  const users = await prisma.user.findMany();

  return users;
}

// TODO: add schema validation with ZOD
async function create(data: any): Promise<User> {
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
        password: await generateHash(data.password),
        title: data.title
          ? {
              create: {
                ...data.title
              }
            }
          : undefined
      }
    });

    return { ...user, password: '*' };
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
