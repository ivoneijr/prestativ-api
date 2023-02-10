import type { Request, Response } from 'express';
import service from '../../services/users';

async function list(req: Request, res: Response): Promise<void> {
  const { page, size, q } = req.query;

  const users = q
    ? await service.search(q as string)
    : await service.list({
        page: Number(page ?? 0),
        size: Number(size ?? 20)
      });

  res.json(users);
}

async function create(req: Request, res: Response): Promise<void> {
  const user = await service.create(req.body);

  res.status(201).json(user);
}

export default {
  list,
  create
};
