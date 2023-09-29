import axios from 'axios';
import { Recipe, ProductDetails } from '../interfaces/general';
const apiKey = ''; //'e01d44ef8a69456a904614af30d94e79'

export async function fetchRandomDishes() {
  try {
    const response = await axios.get('http://localhost:4242/random-dishes');
    return response.data;
  } catch (err) {
    console.error(err);
  }
}


export async function handleLikeClick (recipe, setLikedRecipes) {
  try {
    await axios.post(`http://localhost:4242/likedDishes`, recipe);
    setLikedRecipes((prevLikedRecipes) => ({
      ...prevLikedRecipes,
      [recipe.title]: !prevLikedRecipes[recipe.title],
    }));
  } catch (err) {
    console.log('Error', err);
  }

};


export async function fetchRecipesByIngredient(ingredient: String):Promise<Recipe[]> {
  try {
    console.log(ingredient)
    const response = await axios.get<Recipe[]>(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`
    );

    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function fetchRecipeDetails(recipeId):Promise<ProductDetails> {
  try {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    const response = await axios.get<ProductDetails>(apiUrl);
    return response.data;
  } catch(err) {
    throw err;
  }
}

export async function removeFromFavorites(dishId) {
  try {
    await axios.delete(`http://localhost:4242/likedDishes/${dishId}`);
  } catch (err) {
    throw(err);
  }
}