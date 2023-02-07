import { type NextFunction, type Response, type Request } from 'express';
import Log from 'debug';

const expressLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const path = req.url.split('/')[1];
  const log = Log(`api:${path}`);
  const msg = `${req.method} ${req.url} ${JSON.stringify(
    req.body
  )} ${JSON.stringify(req.headers)}`;

  log(msg);

  next();
};

export default expressLogger;
