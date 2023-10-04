import { useState, useEffect, useContext } from "react";
import { fetchRandomDishes } from "../apiServices/apiServices";
import { ErrorContext } from "../context/Error";
import { RndDish } from "../interfaces/general";

function useRandomDish() {
  const [randomRecipe, setRandomRecipe] = useState<RndDish[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showError } = useContext(ErrorContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRandomDishes();
        setRandomRecipe(data);
        setIsLoading(false);
      } catch (error) {
        showError(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { randomRecipe, isLoading };
}

export default useRandomDish;
