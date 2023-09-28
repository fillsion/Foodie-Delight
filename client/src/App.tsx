// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import ThreeRandomDishes from './components/ThreeRandomDishes';
import RandomDish from './components/RandomDish';
import IngredientSearchResults from './components/IngredientSearchResults';
import InsForClickedRecipeFromSearch from './components/InsForClickedRecipeFromSearch';
import MyFavorites from './components/MyFavorites';

import { fetchRandomDishes } from './apiServices/apiServices';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [recipesThatAreLiked, setRecipesThatAreLiked] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRandomDishes();
        setRecipes(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);


  return (
    <Router>
      <div className="App">
        <h1>
          <Link to="/">Foodie Delight</Link>
        </h1>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <p>Loading...</p>
              ) : (
                <ThreeRandomDishes
                  recipes={recipes}
                  favorites={favorites}
                  recipesThatAreLiked={recipesThatAreLiked}
                />
              )
            }
          />
          <Route path="/random-dish" element={<RandomDish />} />
          <Route
            path="/my-favorites"
            element={<MyFavorites recipesThatAreLiked={recipesThatAreLiked} />}
          />
          <Route
            path="/ingredient/:ingredient/*"
            element={<IngredientSearchResults isLoading={false} />}
          />
          <Route
            path="/ingredient/:ingredient/:recipeId"
            element={<InsForClickedRecipeFromSearch />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
