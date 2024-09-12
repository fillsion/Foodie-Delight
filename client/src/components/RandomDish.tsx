import React from 'react'
import useRandomDish from '../hooks/useRandomDish';

function RandomDish() {
  const {randomRecipe, isLoading} = useRandomDish()
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
