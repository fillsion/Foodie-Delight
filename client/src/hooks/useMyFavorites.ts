import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { removeFromFavorites } from "../apiServices/apiServices";
import { Dishes, ErrorResponse } from "../interfaces/general";

function useMyFavorites() {
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

  return {likedDishes,handleRemoveFromFavorites}
}

export default useMyFavorites;
