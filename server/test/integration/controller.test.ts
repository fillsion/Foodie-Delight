import express, { response } from 'express';
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
      .then(() => {
        console.log('connected to MongoDB')
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
      });
  })

  afterEach(async () => {
    await Dish.deleteMany();
  })

  it('it should save a liked dish to the database', async () => {
    
    const dishData = {
      title: 'Test Dish',
      image: 'test-image-url',
      summary: 'Test summary',
      instructions: 'Test instructions',
      liked: false
    };

    await request
      .post('/likedDishes')
      .send(dishData)
      .expect(200); 
    
    const savedDish = await Dish.findOne({ title: 'Test Dish2' });
    expect(savedDish).toBeTruthy();
  })

  it('it should get all liked dishes', async () => {
    const likedDishes = [
      {
        title: 'Test Dish',
        image: 'test-image-url',
        summary: 'Test summary',
        instructions: 'Test instructions',
        liked: true 
      },
      {
        title: 'Test Dish2',
        image: 'test-image-url2',
        summary: 'Test summary2',
        instructions: 'Test instructions2',
        liked: true
      },
    ];

    await Dish.insertMany(likedDishes);

    const response = await request.get('/likedDishes').expect(200);
    
    expect(response.body.length).toBe(likedDishes.length);
  })

  it('should delete an existing liked dish', async () => {
    const likedDish = new Dish({
      title: 'Test Dish',
      image: 'test-image-url',
      summary: 'Test summary',
      instructions: 'Test instructions',
      liked: true,
    });
    await likedDish.save();

    const response = await request.delete(`/likedDishes/${likedDish._id}`).expect(200);

    expect(response.body.message).toBe('Dish deleted successfully');

    const deletedDish = await Dish.findById(likedDish._id);
    expect(deletedDish).toBeNull();
  });
})

