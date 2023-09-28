import axios from 'axios';
const apiKey = '';

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


export async function fetchRecipesByIngredient(ingredient) {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function fetchRecipeDetails(recipeId) {
  try {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    const response = await axios.get(apiUrl);
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