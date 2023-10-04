import mongoose, { Model } from 'mongoose';

export interface IUser {
  email: string;
  savedDishes: IDish[];
}

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
