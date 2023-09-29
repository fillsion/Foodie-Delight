import express from 'express';
import router from '../../server/router';
import supertest from 'supertest';
import Dish from '../../server/models/Dish'

import mongoose from 'mongoose';
const databaseName = 'test';

describe('integration tests', () => {

  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://localhost:27017/${databaseName}`;
    await mongoose.connect(url);
  })

  afterEach(async () => {
    await Dish.deleteMany();
  })

  //it.....
})
