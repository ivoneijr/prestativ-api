import express from 'express';
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  return res.send('GET /users/');
});

export default router;
