import type { Request, Response } from 'express';
import service from '../../services/users';

async function list(_req: Request, res: Response): Promise<void> {
  const users = await service.list();

  res.send(users);
}

async function create(req: Request, res: Response): Promise<void> {
  const user = await service.create(req.body);

  res.status(201).send(user);
}

export default {
  list,
  create
};
