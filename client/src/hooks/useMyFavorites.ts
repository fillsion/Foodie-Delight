import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosError } from "axios";
import { removeFromFavorites, fetchLikedDishes } from "../apiServices/apiServices";
import { Dishes, ErrorResponse } from "../interfaces/general";
import { ErrorContext } from "../context/Error";

function useMyFavorites() {
  const [likedDishes, setLikedDishes] = useState<Dishes[]>([]);
  const { showError } = useContext(ErrorContext);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await fetchLikedDishes();
        setLikedDishes(data);
      } catch (error) {
        showError(error);
      }
    }
    fetchData();
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

  return { likedDishes, handleRemoveFromFavorites };
}

export default useMyFavorites;
