import type express from 'express';
import service from '../../services/users';

async function list(
  _req: express.Request,
  res: express.Response
): Promise<express.Response<any, Record<string, any>>> {
  try {
    const users = await service.list();

    return res.send(users);
  } catch (error) {
    return res.status(500).send({});
  }
}

export default {
  list
};
