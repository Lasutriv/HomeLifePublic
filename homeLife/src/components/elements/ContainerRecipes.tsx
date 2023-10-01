// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Recipes page of the HomeLife app.

import '../../css/dashboards/Cooking.css';

import { Link } from "react-router-dom";
import SecurityClearance, { AppFeatureType } from "../privateRoute/SecurityClearance";
import { useEffect, useState } from "react";
import { DUMMY_COOKING_RECIPE_DATA } from '../MiscData';
import { CustomSearchBar } from '../inputs/CommonInputs';
import { Accordion, AccordionItem as Item} from '@szhsin/react-accordion';
import { APIPOSTCookingRecipe } from '../../api/Common';
import GenericOkayForm from '../forms/GenericOkayForm';
import CookingRecipeForm from '../forms/CookingRecipeForm';
import Modal from './Modal';

export interface ICookingRecipeProps {
    name: string;
    link: string;
    author: string;
    description: string;
    isFavorite: boolean;
    ingredients: string[];
    steps: string[];
}

function ContainerRecipes() {
    const [recipes, setRecipes] = useState(DUMMY_COOKING_RECIPE_DATA);
    const [highlightedRecipes, setHighlightedRecipes] = useState(DUMMY_COOKING_RECIPE_DATA);
    const [favoriteRecipes, setFavoriteRecipes] = useState(DUMMY_COOKING_RECIPE_DATA);
    const [isCookingRecipeSubmitModal, setIsCookingRecipeSubmitModal] = useState<boolean>(false);
    const [isCookingRecipeFormOpen, setIsCookingRecipeFormOpen] = useState<boolean>(false);

    useEffect(() => {
        // TODO: Get favorite recipes by combining user favorites and the recipe data

    }, [recipes]);

    const AccordionItem = ({ header, ...rest }) => (
        <Item
        {...rest}
        header={
            <>
            {header}
                <i className="fas fa-chevron-down"></i>
            </>
        }
        />
    );

    const favoriteUnfavoriteRecipe = (recipe: ICookingRecipeProps) => {

    }

    const handleSearchingRecipes = (searchValue: any) => {
        let newRecipeItems = DUMMY_COOKING_RECIPE_DATA.filter((item: ICookingRecipeProps) => {            
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        
        setRecipes(newRecipeItems);
    }

    return (
        <div className='content-container'>
            <SecurityClearance 
                featureType={AppFeatureType.Cooking} 
                noClearanceNote={
                    <>Cooking</>
                }
                feature={
                    <>
                        <div className="highlight-header">
                            {/* TODO: Add top liked/favorited recipes */}
                            <h1>Highlighted</h1>
                            <div className='highlight-items'>
                                {highlightedRecipes?.map((recipeItem: ICookingRecipeProps, index) => {
                                    return (
                                        <div className='highlight-item'>
                                            <h2><Link to={'recipe' + recipeItem.link} rel="noreferrer">{recipeItem.name}</Link></h2>
                                            <h3>Author: {recipeItem.author}</h3>
                                            <p className="recipe-description">{recipeItem.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="favorites-header">
                            <h1>Favorites</h1>
                            <div className='favorites-items'>
                                {favoriteRecipes?.map((recipeItem: ICookingRecipeProps, index) => {
                                    return (
                                        <div className='favorite-item'>
                                            <div className={'favorite-button '} onClick={ () => {
                                                    favoriteUnfavoriteRecipe(recipeItem);
                                                }}>
                                                    {recipeItem.isFavorite ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                                                </div>
                                            <h2><Link to={'recipe' + recipeItem.link} rel="noreferrer">{recipeItem.name}</Link></h2>
                                            <h3>Author: {recipeItem.author}</h3>
                                            <p className="recipe-description">{recipeItem.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='recipe-scroller'>
                            <div className='scroller-container'>
                                <h1>Recipes</h1>
                                <div className='scroller'>
                                    {/* https://www.npmjs.com/package/react-infinite-scroll-component */}
                                    {recipes?.map((recipeItem: ICookingRecipeProps, index) => {
                                        return (
                                            <div className='recipe-item'>
                                                <div className={'favorite-button '} onClick={ () => {
                                                    favoriteUnfavoriteRecipe(recipeItem);
                                                }}>
                                                    {recipeItem.isFavorite ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                                                </div>
                                                {/* Might use https://www.robinwieruch.de/react-router-nested-routes/ */}
                                                <h2><Link to={'recipe' + recipeItem.link} rel="noreferrer">{recipeItem.name}</Link></h2>
                                                <h3>Author: {recipeItem.author}</h3>
                                                <p className="recipe-description">{recipeItem.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className='info-container'>
                                <div className='new-recipe-container'>
                                    <h3>New Recipe</h3>
                                    <div className='plus-container'>
                                        <button className='plus-button' onClick={() => {
                                            setIsCookingRecipeFormOpen(true);
                                        }}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                        {/* <div className='public-recipe-checkbox'>
                                            <label htmlFor="new-public-recipe-checkbox">Public</label>
                                            <input type="checkbox" id="new-public-recipe-checkbox" name="new-public-recipe-checkbox" value="new-public-recipe-checkbox" />
                                        </div> */}
                                    </div>
                                    <div className='user-info'>
                                        <span className='user-icon'>
                                            <i className="fas fa-user"></i> { JSON.parse(localStorage.getItem('user')).firstName }
                                        </span>
                                        <span className='date-icon'>
                                            <i className="far fa-calendar-alt"></i> {new Date().toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <CustomSearchBar 
                                    classSuffix="w-100" 
                                    placeholder="Search recipes..."
                                    onChangeCallback={(value) => {
                                        handleSearchingRecipes(value);
                                    }} 
                                />
                                <div className='current-selection'>

                                </div>
                                <div className='rules'>
                                    Rules
                                    <Accordion transition transitionTimeout={250}>
                                        <AccordionItem header='#1 Respect and Kindness'>
                                            We are all here to learn and grow. Please be respectful and kind to others.
                                        </AccordionItem>
                                        <AccordionItem header='#2 No Spam'>
                                            Spamming is not allowed. Please do not spam.
                                        </AccordionItem>
                                        <AccordionItem header='#3 No Advertising'>
                                            Advertising is not allowed. Please do not advertise.
                                        </AccordionItem> 
                                    </Accordion>
                                </div>
                                <div className='mods'>
                                    Mods
                                    <ul>
                                        <li>Tanner</li>
                                    </ul>
                                </div>
                                <div className='resources'>
                                    Resources
                                    {/* <ul>
                                        <li></li>
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                        {isCookingRecipeSubmitModal && (
                            <GenericOkayForm title="Submitted!" description="Your recipe has been added to public cookbook." isShowingGenericOkayForm={setIsCookingRecipeSubmitModal}/>
                        )}
                        {isCookingRecipeFormOpen && (
                            <Modal
                                title="Add Recipe" 
                                textInfo="Add a recipe by filling in the below information."
                                form={<CookingRecipeForm isCookingRecipeSubmitModal={setIsCookingRecipeSubmitModal} isModelShowing={setIsCookingRecipeFormOpen} />}
                            />
                        )}
                    </>
                }
            />
        </div>
    );
}

export default ContainerRecipes;