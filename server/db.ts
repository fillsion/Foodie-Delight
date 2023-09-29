import mongoose from 'mongoose';

const DB_URL = 'mongodb://localhost:27017/FoodieDelights';

export const mongooseConnection = mongoose.connect(DB_URL)
  .then(() => {
  console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });


