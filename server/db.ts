import mongoose from 'mongoose';

const DB_URL = 'mongodb+srv://danieldigitalartsprojects:lzYBXlmoKBiJPJ1S@cluster0.7zia4i5.mongodb.net/FoodieDelights';

export const mongooseConnection = mongoose.connect(DB_URL)
  .then(() => {
  console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });


