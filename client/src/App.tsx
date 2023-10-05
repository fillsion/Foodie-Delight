import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import ThreeRandomDishes from "./components/ThreeRandomDishes";
import RandomDish from "./components/RandomDish";
import IngredientSearchResults from "./components/IngredientSearchResults";
import InsForClickedRecipeFromSearch from "./components/InsForClickedRecipeFromSearch";
import MyFavorites from "./components/MyFavorites";

import LoginScreen from "./components/LoginScreen";
import { UserContext } from './context/User';

function App() {

  const {isLogged} = useContext(UserContext)

  useEffect(()=>{
console.log(isLogged)
  },[isLogged])

  return (
    <div className="App">
      {isLogged ? (
        <Router>
        <>
          <h1>
            <Link to="/">Foodie Delight</Link>
          </h1>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={  <ThreeRandomDishes />}
            />
            <Route path="/random-dish" element={<RandomDish />} />
            <Route path="/my-favorites" element={<MyFavorites />} />
            <Route
              path="/ingredient/:ingredient/*"
              element={<IngredientSearchResults isLoading={false} />}
            />
            <Route
              path="/ingredient/:ingredient/:recipeId"
              element={<InsForClickedRecipeFromSearch />}
            />
          </Routes>
        </>
      </Router>
      ) : (
        <LoginScreen />

      )}
    </div>
  );
}

export default App;
