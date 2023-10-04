import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeDetails } from "../apiServices/apiServices";
import { ErrorContext } from "../context/Error";
import { ProductDetails } from "../interfaces/general";

function useRecipeDetails() {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<ProductDetails | null>(null);
  const { showError } = useContext(ErrorContext);
  useEffect(() => {
    async function fetchData() {
      try {
        if (!recipeId) return;
        const data = await fetchRecipeDetails(recipeId);
        setRecipeDetails(data);
      } catch (error) {
        showError(error);
      }
    }
    fetchData();
  }, [recipeId]);

  return recipeDetails;
}

export default useRecipeDetails;
