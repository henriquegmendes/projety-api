import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get('/', (req, res) => res.json({ message: 'Hello Projety API! :-)' }));

app.listen(process.env.PORT, () => console.log(`App connected at PORT ${process.env.PORT}`));
