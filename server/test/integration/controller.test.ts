import express, { response } from 'express';
import router from '../../router';
import supertest from 'supertest';
import Dish from '../../models/Dish';

import mongoose from 'mongoose';

const dbConnection = "mongodb://127.0.0.1:27017"
const databaseName = 'test';

describe('integration tests', () => {

  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `${dbConnection}/${databaseName}`;
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
  afterAll(async ()=>{
    await mongoose.connection.close();
  })

  it('it should save a liked dish to the database', async () => {
    const dishData = {
      title: 'Test Dish',
      image: 'test-image-url',
      summary: 'Test summary',
      instructions: 'Test instructions',
      liked: false
    };


  const response = await request
  .post('/likedDishes')
  .send(dishData)
  .expect(200);

expect(response.body).toHaveProperty('message', 'Dish liked and saved successfully');

    const savedDish = await Dish.findOne({ title: 'Test Dish' });
    expect(savedDish).toBeTruthy()
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

    const response = await request.get(`/likedDishes`).expect(200);

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
    const savedDish = await likedDish.save();
    const response = await request.delete(`/likedDishes/${savedDish._id}`).expect(200);
    expect(response.body.message).toBe('Dish deleted successfully');
    const deletedDish = await Dish.findById(likedDish._id);
    expect(deletedDish).toBeNull();
  });

  it('should return an error when trying to delete a non-existent liked dish', async () => {
    const nonExistentDishId = new mongoose.Types.ObjectId();
    const response = await request.delete(`/likedDishes/${nonExistentDishId}`).expect(404);
    expect(response.body).toHaveProperty('message', 'Dish not found');
  });

  it('should get three random dishes', async () => {

    const response = await request.get('/random-dishes').expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body.length).toBe(3);

    response.body.forEach((dish) => {
      expect(dish).toHaveProperty('title');
      expect(dish).toHaveProperty('image');
      expect(dish).toHaveProperty('summary');
      expect(dish).toHaveProperty('instructions');
      expect(dish).toHaveProperty('liked', false); // Random dishes should not be liked
    });
  });

  it('should return an error when trying to save an already liked dish', async () => {
    const likedDishData = {
      title: 'Test Dish',
      image: 'test-image-url',
      summary: 'Test summary',
      instructions: 'Test instructions',
      liked: true,
    };
    await Dish.create(likedDishData);

    const response = await request
      .post('/likedDishes')
      .send(likedDishData)
      .expect(400);
    expect(response.body).toHaveProperty('message', 'Dish already liked');
  });

  it('should return an error when trying to save a dish with missing data', async () => {
    const dishData = {
      image: 'test-image-url',
      summary: 'Test summary',
      instructions: 'Test instructions',
      liked: true,
    };

    const response = await request
      .post('/likedDishes')
      .send(dishData)
      .expect(400);

    expect(response.body).toHaveProperty('message', 'Validation error');
  });

  it('should handle no liked dishes found', async () => {
    const response = await request.get('/likedDishes').expect(404);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'No liked dishes found');
  });
})

