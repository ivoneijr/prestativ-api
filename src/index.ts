import 'express-async-errors';
import express from 'express';
import Log from 'debug';
import dotenv from 'dotenv';

import expressLogger from './middlewares/express-logger';
import status from './routes/status';
import users from './routes/users';
import { handleErrors } from './middlewares/api-error';

dotenv.config();

const app = express();
app.use(express.json());
app.use(expressLogger);

app.use('/status', status);
app.use('/users', users);

app.use(handleErrors);
app.listen(process.env.PORT, () => {
  Log('api:main')(`API up and running on port ${process.env.PORT ?? ''}`);
});
