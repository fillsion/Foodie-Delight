import React, {useContext} from "react";
import useThreeRandomDishes from "../hooks/useThreeRandomDishes";
import { RndDish } from "../interfaces/general";
import { UserContext } from "../context/User";

interface ThreeRandomDishesProps {
  recipes: RndDish[];
}
const ThreeRandomDishes: React.FC<ThreeRandomDishesProps> = ({
  recipes,
}: ThreeRandomDishesProps) => {
  const { selectedRecipe, likedRecipes, handleTitleClick, handleLikeClickWrapper } =
    useThreeRandomDishes();
  
  const { userEmail } = useContext(UserContext);

  return (
    <div className="recipe-list">
      {recipes &&
        recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.title}>
            <img src={recipe.image} alt={recipe.title} />
            <p className="recipe-title" onClick={() => handleTitleClick(recipe)}>
              {recipe.title}
            </p>
            <button
              className={`like-button ${likedRecipes[recipe.title] ? "liked" : "not-liked"}`}
              onClick={() => handleLikeClickWrapper(userEmail ,recipe)}
            >
              {likedRecipes[recipe.title] ? "Liked" : "Like"}
            </button>
            {selectedRecipe === recipe && (
              <div className="recipe-instructions">
                <h2>Instructions:</h2>
                <p>{recipe.instructions}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ThreeRandomDishes;
