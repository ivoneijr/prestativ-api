// import { type User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '../../db/prisma/client';
import { ApiError } from '../../utils/api-error';
import { HTTP } from '../../utils/constants';

// TODO: add schema validation with ZOD
async function login(data: any): Promise<any> {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  });

  if (!user) {
    throw new ApiError(HTTP.BAD_REQUEST, 'User Not Found');
  }

  if (!(await bcrypt.compare(data.password, user.password))) {
    throw new ApiError(HTTP.BAD_REQUEST, 'Wrong Password');
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      firstName: user.firstName
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN as string
    }
  );

  return { token };
}

export default {
  login
};
