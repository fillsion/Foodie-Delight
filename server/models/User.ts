import mongoose, { Model } from 'mongoose';

export interface IUser {
  email: string;
  savedDishes: SavedDish[];
}

export interface SavedDish {
  _id:string,
  title: string;
  image: string;
  summary: string;
  instructions: string;
  liked: boolean;
}

const dishSchema = new mongoose.Schema<SavedDish>({
  title: String,
  image: String,
  summary: String,
  instructions: String,
  liked: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  savedDishes: [dishSchema],
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
