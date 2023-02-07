import express from 'express';
import controller from '../../controllers/users';

const router = express.Router({ mergeParams: true });

router.get('/', controller.list);
router.post('/', controller.create);

export default router;
