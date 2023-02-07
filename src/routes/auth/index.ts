import express from 'express';
import controller from '../../controllers/auth';

const router = express.Router({ mergeParams: true });

router.post('/login', controller.login);

export default router;
