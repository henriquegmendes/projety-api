import express from 'express';
import dotenv from 'dotenv';

import requestTrackMiddleware from './middlewares/requestTracking';
import errorHandlingMiddleware from './middlewares/errorHandling';
import resourceNotFoundMiddleware from './middlewares/resourceNotFound';

dotenv.config();
const app = express();

app.use(requestTrackMiddleware);

app.get('/', (req, res, next) => {
  try {
    dasdasdasd
    res.json({ message: 'Hello Projety API! :-)' })
  } catch (error) {
    next(error);
  }
});

app.use(errorHandlingMiddleware);
app.use(resourceNotFoundMiddleware);

app.listen(process.env.PORT, () => console.log(`App connected at PORT ${process.env.PORT}`));
