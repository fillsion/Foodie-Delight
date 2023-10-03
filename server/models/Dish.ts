import mongoose, { Model } from 'mongoose';

export interface IDish {
  title: string;
  image: string;
  summary: string;
  instructions: string;
  liked: boolean;
}

const dishSchema = new mongoose.Schema<IDish>({
  title: String,
  image: String,
  summary: String,
  instructions: String,
  liked: {
    type: Boolean,
    default: false,
  },
});

const Dish: Model<IDish> = mongoose.model<IDish>('Dish', dishSchema);

export default Dish;
