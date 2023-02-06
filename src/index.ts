import express from 'express';
import status from './routes/status';
import users from './routes/users';

const app = express();
app.use(express.json());

app.use('/status', status);
app.use('/users', users);

app.listen(3000, () => {
  console.log('listening....');
});
