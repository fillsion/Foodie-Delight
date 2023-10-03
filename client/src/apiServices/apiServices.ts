import React from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Recipe, ProductDetails, RndDish } from "../interfaces/general";

const apiKey = "337d1853f27a4c559c6e9f124a823ccb";

const handleErrorMessage = (error: any): string => {
  const axiosError = error as AxiosError;
  if (axiosError.response) {
    return axiosError.response.statusText;
  }
  //TODO verify backend response message
  return error.message;
};

async function handleRequest<T>(fetch: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const response = await fetch;
    return response.data;
  } catch (err: any) {
    return Promise.reject(handleErrorMessage(err));
  }
}

export function fetchRandomDishes(): Promise<RndDish[]> {
  return handleRequest(axios.get<RndDish[]>("http://localhost:4242/random-dishes"));
}

export async function handleLikeClick(
  recipe: RndDish,
  setLikedRecipes: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) {
  try {
    await handleRequest(axios.post("http://localhost:4242/likedDishes", recipe));
    setLikedRecipes((prevLikedRecipes) => ({
      ...prevLikedRecipes,
      [recipe.title]: !prevLikedRecipes[recipe.title],
    }));
  } catch (err) {
    console.error("Error", err);
  }
}

export function fetchRecipesByIngredient(ingredient: string): Promise<Recipe[]> {
  return handleRequest(
    axios.get<Recipe[]>(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`
    )
  );
}

export function fetchRecipeDetails(recipeId: string): Promise<ProductDetails> {
  return handleRequest(
    axios.get<ProductDetails>(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    )
  );
}

export function removeFromFavorites(dishId: string): Promise<void> {
  return handleRequest(axios.delete(`http://localhost:4242/likedDishes/${dishId}`));
}