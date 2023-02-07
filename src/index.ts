import 'express-async-errors';
import express from 'express';
import Log from 'debug';
import dotenv from 'dotenv';

import expressLogger from './middlewares/express-logger';
import { handleErrors } from './middlewares/api-error';
import status from './routes/status';
import users from './routes/users';
import auth from './routes/auth';

dotenv.config();

const app = express();
app.use(express.json());
app.use(expressLogger);

app.use('/status', status);
app.use('/users', users);
app.use('/auth', auth);

app.use(handleErrors);
app.listen(process.env.PORT ?? 5050, () => {
  Log('api:main')(`API up and running on port ${process.env.PORT ?? '5050'}`);
});
