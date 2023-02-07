import express from 'express';
import authorizedBy from '../../middlewares/authorizedBy';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  return res.status(200).send({ success: true });
});

router.get('/private', authorizedBy(['ADMIN']), (req, res) => {
  return res.status(200).send({ success: true });
});

export default router;
