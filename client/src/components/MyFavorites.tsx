import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { removeFromFavorites } from "../apiServices/apiServices";
import { Dishes, ErrorResponse } from "../interfaces/general";

function MyFavorites() {
  const [likedDishes, setLikedDishes] = useState<Dishes[]>([]);

  useEffect(() => {
    axios
      .get<Dishes[]>("http://localhost:4242/likedDishes")
      .then((response) => {
        setLikedDishes(response.data);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        if (error.response && error.response.data.message) {
          console.error("Error:", error.response.data.message);
        } else {
          console.error("Error:", error.message);
        }
      });
  }, []);

  const handleRemoveFromFavorites = (dishId: string) => {
    removeFromFavorites(dishId)
      .then(() => {
        setLikedDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        if (error.response && error.response.data.message) {
          console.error("Error:", error.response.data.message);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <div className="favorite-dishes">
      <h1>My Favorite Dishes</h1>
      <div className="fav-dish-list">
        {likedDishes.map((dish) => (
          <div className="fav-dish-card" key={dish._id}>
            <div className="left-fav-dish-card">
              <h2>{dish.title}</h2>
              <img src={dish.image} alt={dish.title} />
              <button onClick={() => handleRemoveFromFavorites(dish._id)}>
                Remove from My Favorites
              </button>
            </div>
            <div className="right-fav-dish-card">
              <p>
                <strong>Instructions:</strong> {dish.instructions}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyFavorites;
