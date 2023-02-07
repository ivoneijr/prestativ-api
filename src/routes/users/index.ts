import express from 'express';
import controller from '../../controllers/users';
import validate from '../../middlewares/payload-validator';
import { createPayloadSchema } from './schemas';
const router = express.Router({ mergeParams: true });

router.get('/', controller.list);
router.post('/', validate(createPayloadSchema), controller.create);

export default router;
