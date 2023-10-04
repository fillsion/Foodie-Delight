import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import InsForClickedRecipeFromSearch from "./InsForClickedRecipeFromSearch";
import useSearch from "../hooks/useSearch";

interface IngredientSearchResultsProps {
  isLoading: boolean;
}

const IngredientSearchResults: React.FC<IngredientSearchResultsProps> = ({
  isLoading,
}: IngredientSearchResultsProps) => {
  const { recipes, ingredient } = useSearch();

  return (
    <div className="search-results">
      <h2>Recipes containing {ingredient}:</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="recipe-list-from-search">
          {recipes.map((recipe) => (
            <div className="recipe-card-from search" key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <Link to={`/ingredient/${ingredient}/${recipe.id}`} className="recipe-title-link">
                {recipe.title}
              </Link>
            </div>
          ))}
        </div>
      )}
      <Routes>
        <Route
          path="/ingredient/:ingredient/:recipeId"
          element={<InsForClickedRecipeFromSearch />}
        />
      </Routes>
    </div>
  );
};

export default IngredientSearchResults;
