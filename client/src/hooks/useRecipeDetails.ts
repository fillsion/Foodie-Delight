import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeDetails } from "../apiServices/apiServices";
import { ProductDetails } from "../interfaces/general";

function useRecipeDetails() {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<ProductDetails>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRecipeDetails(recipeId);
        setRecipeDetails(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [recipeId]);

  return recipeDetails;
}

export default useRecipeDetails;
