import express from 'express';
import router from '../../router';
import supertest from 'supertest';
import Dish from '../../models/Dish';

import mongoose from 'mongoose';
const databaseName = 'test';

describe('integration tests', () => {

  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://localhost:27017/${databaseName}`;
    await mongoose.connect(url)    
  })

  afterEach(async () => {
    await Dish.deleteMany();
    mongoose.disconnect();
  })

  it('it should save a liked dish to the database', async () => {
    
    const dishData = {
      title: 'Test Dish2',
      image: 'test-image-url2',
      summary: 'Test summary2',
      instructions: 'Test instructions2',
      liked: false
    };

    await request
      .post('/likedDishes')
      .send(dishData)
      .expect(200); 
    
    const savedDish = await Dish.findOne({ title: 'Test Dish2' });
    expect(savedDish).toBeTruthy();
  })
})