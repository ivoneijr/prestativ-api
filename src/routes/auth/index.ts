import express from 'express';
import controller from '../../controllers/auth';
import validate from '../../middlewares/payload-validator';
import { loginPayloadSchema } from './schemas';

const router = express.Router({ mergeParams: true });

router.post('/login', validate(loginPayloadSchema), controller.login);

export default router;
