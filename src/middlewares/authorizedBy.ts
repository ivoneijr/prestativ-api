import jwt from 'jsonwebtoken';
import { type NextFunction, type Response, type Request } from 'express';
import { ApiError } from '../utils/api-error';
import { HTTP } from '../utils/constants';

const authorizedBy =
  (allowedRoles: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      throw new ApiError(HTTP.UNAUTHORIZED, 'Unauthorized: invalid token');
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      if (!allowedRoles.includes(decoded?.role as string)) {
        throw new ApiError(HTTP.UNAUTHORIZED, 'Unauthorized: user not allowed');
      }

      next();
    } catch (error: any) {
      throw new ApiError(
        HTTP.UNAUTHORIZED,
        `Unauthorized: ${JSON.stringify(error?.message)}`
      );
    }
  };

export default authorizedBy;
