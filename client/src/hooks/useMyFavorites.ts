import { useState, useEffect, useContext } from "react";
import { AxiosError } from "axios";
import { removeFromFavorites, fetchLikedDishes } from "../apiServices/apiServices";
import { Dishes, ErrorResponse } from "../interfaces/general";
import { ErrorContext } from "../context/Error";
import { UserContext } from "../context/User";

function useMyFavorites() {
  const [likedDishes, setLikedDishes] = useState<Dishes[]>([]);
  const { showError } = useContext(ErrorContext);
  const { userEmail } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchLikedDishes(userEmail);
        setLikedDishes(data);
      } catch (error) {
        showError(error);
      }
    }
    fetchData();
  }, []);

  const handleRemoveFromFavorites = (email: string, dishId: string) => {
    removeFromFavorites(email, dishId)
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
