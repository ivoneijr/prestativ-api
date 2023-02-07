import type express from 'express';
import { type ApiError } from '../utils/api-error';
import { HTTP } from '../utils/constants';

export const handleErrors = (
  error: Error & Partial<ApiError>,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response<any, Record<string, any>> => {
  const code: number = error.statusCode ?? HTTP.INTERNAL_SERVER_ERROR;
  const message =
    code === HTTP.INTERNAL_SERVER_ERROR
      ? 'Internal Server Error'
      : error.message;

  if (code === HTTP.INTERNAL_SERVER_ERROR) {
    console.log(error);
  }

  return res.status(code).json({ code, message });
};
