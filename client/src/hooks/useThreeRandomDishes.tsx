import { useContext, useState } from "react";
import { handleLikeClick } from "../apiServices/apiServices";
import { RndDish } from "../interfaces/general";
import { ErrorContext } from "../context/Error";

const useThreeRandomDishes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<RndDish | null>(null);
  const [likedRecipes, setLikedRecipes] = useState<Record<string, boolean>>({});
  const { showError } = useContext(ErrorContext);

  const handleTitleClick = (recipe: RndDish) => {
    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };

  const handleLikeClickWrapper = async (email: string, recipe: RndDish) => {
    try {
      await handleLikeClick(email, recipe);
      setLikedRecipes((prevLikedRecipes) => ({
        ...prevLikedRecipes,
        [recipe.title]: !prevLikedRecipes[recipe.title],
      }));
    } catch (err) {
      showError(err);
    }
  };

  return {selectedRecipe, likedRecipes, handleTitleClick, handleLikeClickWrapper}
};

export default useThreeRandomDishes;
