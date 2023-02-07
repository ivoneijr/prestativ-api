import type express from 'express';
import service from '../../services/users';

async function list(
  _req: express.Request,
  res: express.Response
): Promise<void> {
  const users = await service.list();

  res.send(users);
}

export default {
  list
};
