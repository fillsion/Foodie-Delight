'use strict';
import express, { Express } from 'express';
import cors from 'cors';

import router from './router.js';

const app: Express = express();
const PORT: number = 4242;

app.use(cors());
app.use(express.json());
app.use('/', router);

// Not neccessary?
// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})