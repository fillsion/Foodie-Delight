import React from "react";
import axios from "axios";
import { Recipe, ProductDetails, RndDish } from "../interfaces/general";
const apiKey = "Your api key";

export async function fetchRandomDishes(): Promise<RndDish[]> {
  try {
    const response = await axios.get<RndDish[]>("http://localhost:4242/random-dishes");
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function handleLikeClick(
  recipe: RndDish,
  setLikedRecipes: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) {
  try {
    await axios.post(`http://localhost:4242/likedDishes`, recipe);
    setLikedRecipes((prevLikedRecipes) => ({
      ...prevLikedRecipes,
      [recipe.title]: !prevLikedRecipes[recipe.title],
    }));
  } catch (err) {
    console.log("Error", err);
  }
}

export async function fetchRecipesByIngredient(ingredient: string): Promise<Recipe[]> {
  try {
    console.log(ingredient);
    const response = await axios.get<Recipe[]>(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`
    );

    return response.data;
  } catch (err) {
    console.log(err)
  }
}

export async function fetchRecipeDetails(recipeId: string): Promise<ProductDetails> {
  try {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    const response = await axios.get<ProductDetails>(apiUrl);
    return response.data;
  } catch (err) {
    console.log(err)
  }
}

export async function removeFromFavorites(dishId: string) {
  try {
    await axios.delete(`http://localhost:4242/likedDishes/${dishId}`);
  } catch (err) {
    console.log(err)
  }
}
