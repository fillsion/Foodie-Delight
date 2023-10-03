'use strict';
import express, { Express } from 'express';
import cors from 'cors';

import router from './router';
import { mongooseConnection } from './db';

const app: Express = express();
const PORT: number = 4242;

app.use(cors());
app.use(express.json());
app.use('/', router);

mongooseConnection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });