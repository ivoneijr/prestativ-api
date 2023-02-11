import { type User } from '@prisma/client';
import { prisma } from '../../db/client';
import { ApiError } from '../../utils/api-error';
import { HTTP } from '../../utils/constants';
import { generateHash } from '../../utils/auth';

async function list({
  page,
  size
}: {
  page: number;
  size: number;
}): Promise<User[]> {
  const users = await prisma.user.findMany({
    skip: page,
    take: size
  });

  return users;
}

async function search(term: string): Promise<User[]> {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: term
          }
        },
        {
          lastName: {
            contains: term
          }
        },
        {
          email: {
            contains: term
          }
        }
      ]
    }
  });

  return users;
}

async function getById(id: string): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  });

  return user;
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
  create,
  search,
  getById
};
