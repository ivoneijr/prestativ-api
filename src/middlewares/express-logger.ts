import { type NextFunction, type Response, type Request } from 'express';
import Log from 'debug';

const log = Log('api:main');

const expressLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const msg = `${req.method} ${req.url} ${JSON.stringify(req.body)}`;

  log(msg);

  next();
};

export default expressLogger;
