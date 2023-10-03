import {useState, useEffect} from 'react'
import { fetchRecipesByIngredient } from '../apiServices/apiServices';
import { useParams } from 'react-router-dom';
import { Recipe } from '../interfaces/general';


export default function useSearch() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { ingredient } = useParams();

    useEffect(() => {
      async function fetchData() {
        try {
            if (!ingredient) return;
          const data = await fetchRecipesByIngredient(ingredient);
          console.log("fetch recepies", data);
          setRecipes(data);
        } catch (err) {
          console.log(err);
        }
      }

      fetchData();
    }, [ingredient]);

  return {recipes, ingredient};
}
