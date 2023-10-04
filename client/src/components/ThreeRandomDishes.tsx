import React, { useContext, useState } from "react";
import { handleLikeClick } from "../apiServices/apiServices";
import { RndDish } from "../interfaces/general";
import { ThreeRandomDishesProps } from "../interfaces/components";
import { ErrorContext } from "../context/Error";
import useThreeRandomDishes from "../hooks/useThreeRandomDishes";

const ThreeRandomDishes: React.FC<ThreeRandomDishesProps> = ({
  recipes,
}: ThreeRandomDishesProps) => {
  const {selectedRecipe, likedRecipes, handleTitleClick, handleLikeClickWrapper} = useThreeRandomDishes()

  return (
    <div className="recipe-list">
      {recipes && recipes.map((recipe) => (
        <div className="recipe-card" key={recipe.title}>
          <img src={recipe.image} alt={recipe.title} />
          <p className="recipe-title" onClick={() => handleTitleClick(recipe)}>
            {recipe.title}
          </p>
          <button
            className={`like-button ${likedRecipes[recipe.title] ? "liked" : "not-liked"}`}
            onClick={() => handleLikeClickWrapper(recipe)}
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
