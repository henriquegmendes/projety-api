import express from 'express';
import dotenv from 'dotenv';

import initMongoConnection from './database/mongodbConfig';

import requestTrackMiddleware from './middlewares/requestTracking';
import errorHandlingMiddleware from './middlewares/errorHandling';
import resourceNotFoundMiddleware from './middlewares/resourceNotFound';

import User from './models/User';

dotenv.config();
const app = express();

initMongoConnection();

app.use(requestTrackMiddleware);

app.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandlingMiddleware);
app.use(resourceNotFoundMiddleware);

app.listen(process.env.PORT, () => console.log(`App connected at PORT ${process.env.PORT}`));
