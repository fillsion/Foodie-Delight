import React, { useState, useEffect } from "react";
import { fetchRandomDishes } from "../apiServices/apiServices";
import { RndDish } from "../interfaces/general";

function useRandomDish() {
  const [randomRecipe, setRandomRecipe] = useState<RndDish[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const generateNewKey = (): number => {
    const newKey = Math.random() * 0.001;
    return newKey;
  };

  useEffect(() => {
    async function fetchData() {
      const newKey = generateNewKey();
      console.log(newKey);
      try {
        const data = await fetchRandomDishes();
        setRandomRecipe(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return {randomRecipe, isLoading}
}

export default useRandomDish;
