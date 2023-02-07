import type { Request, Response } from 'express';
import service from '../../services/auth';

async function login(req: Request, res: Response): Promise<void> {
  const loggedIn = await service.login(req.body);

  res.send(loggedIn);
}

export default {
  login
};
