import React, { useState, useEffect } from "react";
import { fetchRandomDishes } from "../apiServices/apiServices";
import { RndDish } from "../interfaces/general";

function RandomDish() {
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

  return (
    <div>
      <h2>Random Recipe</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        randomRecipe && (
          <div>
            <h3>{randomRecipe[0].title}</h3>
            <img src={randomRecipe[0].image} alt={randomRecipe[0].title} />
            <p>{randomRecipe[0].instructions}</p>
          </div>
        )
      )}
    </div>
  );
}

export default RandomDish;
