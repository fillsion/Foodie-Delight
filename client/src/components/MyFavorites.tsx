
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { removeFromFavorites } from '../apiServices/apiServices';

function MyFavorites() {
  const [likedDishes, setLikedDishes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4242/likedDishes')
      .then((response) => {
        setLikedDishes(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); 

  const handleRemoveFromFavorites = (dishId) => {
    removeFromFavorites(dishId)
      .then(() => {
        setLikedDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='favorite-dishes'>
      <h1>My Favorite Dishes</h1>
      <div className='fav-dish-list'>
        {likedDishes.map((dish) => (
          <div className='fav-dish-card' key={dish._id}>
            <div className='left-fav-dish-card'>
              <h2>{dish.title}</h2>
              <img src={dish.image} alt={dish.title} />
              <button onClick={() => handleRemoveFromFavorites(dish._id)}>Remove from My Favorites</button>
            </div>
            <div className='right-fav-dish-card'>
              <p><strong>Instructions:</strong> {dish.instructions}</p>
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyFavorites;
