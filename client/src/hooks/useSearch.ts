import React, {useState, useEffect, useContext} from 'react'
import { fetchRecipesByIngredient } from '../apiServices/apiServices';
import { useParams } from 'react-router-dom';
import { Recipe } from '../interfaces/general';
import { ErrorContext } from '../context/Error';


export default function useSearch() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { ingredient } = useParams();
    const {showError} = useContext(ErrorContext)
    useEffect(() => {
      async function fetchData() {
        try {
            if (!ingredient) return;
          const data = await fetchRecipesByIngredient(ingredient);
          console.log("fetch recepies", data);
          setRecipes(data);
        } catch (error) {
          showError(error)
        }
      }

      fetchData();
    }, [ingredient]);

  return {recipes, ingredient};
}
