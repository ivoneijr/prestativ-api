import { type NextFunction, type Response, type Request } from 'express';
import Log from 'debug';

const expressLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const path = req.url.split('/')[1];
  const log = Log(`api:${path}`);
  const msg = `${req.method} ${req.url} ${JSON.stringify(req.body)}`;

  log(msg);

  next();
};

export default expressLogger;
