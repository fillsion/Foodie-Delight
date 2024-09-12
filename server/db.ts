import mongoose from 'mongoose';

const DB_URL = 'mongodb://127.0.0.1:27017/FoodieDelights';

export const mongooseConnection = mongoose.connect(DB_URL)
  .then(() => {
  console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });


