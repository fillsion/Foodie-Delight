import React from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Recipe, ProductDetails, RndDish, Dishes, ErrorResponse } from "../interfaces/general";

const apiKey = "e01d44ef8a69456a904614af30d94e79"; //337d1853f27a4c559c6e9f124a823ccb

const handleErrorMessage = (error: any): string => {
  const axiosError = error as AxiosError<ErrorResponse>;
  // Check if the error response has backend response
  if (axiosError.response?.data?.message) return axiosError.response.data.message;

  //Default axios error
  if (axiosError.response?.statusText) return axiosError.response.statusText;

  // Fallback to a generic error message if neither is available
  return "An unexpected error occurred";
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

export async function handleLikeClick(recipe: RndDish,) {
  return handleRequest(axios.post("http://localhost:4242/likedDishes", recipe));
}

export function fetchRecipesByIngredient(ingredient: string): Promise<Recipe[]> {
  return handleRequest(
    axios.get<Recipe[]>(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`
    )
  );
}

export async function fetchRecipeDetails(recipeId: string): Promise<ProductDetails> {
  try {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    const response = await axios.get<ProductDetails>(apiUrl);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function removeFromFavorites(dishId: string) {
  try {
    await axios.delete(`http://localhost:4242/likedDishes/${dishId}`);
  } catch (err) {
    throw err;
  }
}
