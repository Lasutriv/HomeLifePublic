// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Recipe Details page of the HomeLife app.

import { useEffect, useState } from "react";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import { IUserProps } from "../../../Dashboard";

interface RecipeDetailsProps {
    id: string;
    name: string;
    link: string;
    author: string;
    iamgeRef: string;
    description: string;
    ingredients: string[];
    steps: string[];
}

function RecipeDetails() {
    const [recipe, setRecipe] = useState<RecipeDetailsProps | null>(null);
    let { recipeId } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            // Get user email
            let currentUser: IUserProps = JSON.parse(localStorage.getItem('user'));
            console.log("User localstorage data: ", currentUser);
            
            // Get recipe
            if (currentUser != null) {
                // let recipeResponse: ReturnPropsAPIGetRecipeResponse = await APIGetRecipeResponse(currentUser.email, recipeId);
                // console.log("Recipe response: ", recipeResponse);
                // setRecipe(recipeResponse.recipe);
            }
        }
        fetchRecipe();
    }, []);

    return (
        <div>
            <h1>{recipe?.name}</h1>
            <p>{recipe?.description}</p>
            <h2>Ingredients</h2>
            <ul>
                {recipe?.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2>Steps</h2>
            <ol>
                {recipe?.steps.map((step, index) => (
                <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
}

export default RecipeDetails;