import express from 'express';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  return res.status(200).send({ success: true });
});

export default router;
