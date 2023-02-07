import { type NextFunction, type Response, type Request } from 'express';
import { type AnyZodObject } from 'zod';

import { ApiError } from '../utils/api-error';
import { HTTP } from '../utils/constants';

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers
      });
      next();
    } catch (error: any) {
      throw new ApiError(
        HTTP.UNPROCESSABLE_ENTITY,
        JSON.stringify(error.issues)
      );
    }
  };

export default validate;
