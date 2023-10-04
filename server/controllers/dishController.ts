'use strict';

import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import Dish, { IDish } from '../models/User';
import User, {IUser} from '../models/User';
import { Request, Response } from 'express';

const apiKey = 'e01d44ef8a69456a904614af30d94e79';

export const getThreeRandomDishes = async (req: Request, res: Response) => {
  try {
    const numberOfRecipes = 3;
    const recipePromises: Promise<AxiosResponse>[] = [];

    for ( let i =0; i < numberOfRecipes; i++) {
      recipePromises.push(
        axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`)
      )
    }

    const responses = await Promise.all(recipePromises);
    const randomDishes: IDish[] = [];

    responses.forEach((response) => {
      const randomRecipe = response.data.recipes[0];
      const {title, image, summary, instructions} = randomRecipe;
      const $ = cheerio.load(summary);
      const plainTextSummary = $.text();
      const ins = cheerio.load(instructions);
      const plainTextInstructions = ins.text();

      randomDishes.push({
        title,
        image,
        summary: plainTextSummary,
        instructions: plainTextInstructions,
        liked: false
      })
    });
    console.log(randomDishes);
    res.status(200).json(randomDishes);
  } catch (err) {
    console.log('Error', err);
    res.status(500).send('Internal Server Error');
  }
}

export const saveLikedDish = async (req: Request, res: Response) => {
  try {
    const { email, dishData} = req.body;
    //TODO missing attribute validation for incomplete dish data.
    const requiredFields = ['title', 'image', 'summary', 'instructions'];
    if (!requiredFields.every(field => dishData[field])) {
      return res.status(400).json({ message: 'Validation error' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, savedDishes: [] });
      await user.save();
    }

    const existingDish = await user.savedDishes.find(dishData);

    if (existingDish) {
      return res.status(400).json({ message: 'Dish already liked' });
    }

    const newDish: IDish = {
      title: dishData.title,
      image: dishData.image,
      summary: dishData.summary,
      instructions: dishData.instructions,
      liked: true,
    };

    user?.savedDishes.push(newDish);
    await user.save();
    
    res.status(200).json({ message: 'Dish liked and saved successfully' });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
}

export const getLikedDishes = async (req: Request, res: Response) => {
  try {

    const email = req.query.email as string;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const likedDishes = user.savedDishes.filter((dish) => dish.liked);

    if (likedDishes.length === 0) {
      return res.status(404).json({ message: 'No liked dishes found' });
    }

    res.status(200).json(likedDishes);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
}
export const deleteLikedDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.dishId;
    const email = req.query.email as string;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const dishIndex = user.savedDishes.findIndex((dish) => dish._id.toString() === dishId);

    if (dishIndex === -1) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    user.savedDishes.splice(dishIndex, 1);

    await user.save();

    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Not able to delete the dish');
  }
};
