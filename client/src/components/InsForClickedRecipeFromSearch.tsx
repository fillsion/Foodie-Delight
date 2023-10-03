import useRecipeDetails from "../hooks/useRecipeDetails";

function InsForClickedRecipeFromSearch() {
  const recipeDetails = useRecipeDetails();

  return (
    <div className="InsClickedRecipe">
      {recipeDetails && (
        <>
          <img src={recipeDetails.image} alt={recipeDetails.title} />
          <h1>{recipeDetails.title}</h1>
          <h2>Instructions:</h2>
          <div className="recipe-steps">
            {recipeDetails.analyzedInstructions[0]?.steps.map((step, index) => (
              <p key={index}>
                Step {index + 1}: {step.step}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default InsForClickedRecipeFromSearch;
