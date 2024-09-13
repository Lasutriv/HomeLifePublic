// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Cooking page of the HomeLife app.

import '../src/css/dashboards/Cooking.css'

import { useEffect, useState } from "react";
import { APIGetNewsLatest } from "./api/Common";
import { Button, TabButton } from "./components/elements/Button";
import SecurityClearance, { AppFeatureType } from "./components/privateRoute/SecurityClearance";
import { Link, useParams } from "react-router-dom";
import ContainerRecipes from "./components/elements/ContainerRecipes";
import ContainerYourPantry from "./components/elements/ContainerYourPantry";
import ContainerGroceries from "./components/elements/ContainerGroceries";

function Cooking() {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    let { recipeId } = useParams();

    useEffect(() => {
        calculateTabsAndContentPerfectHeight();
    }, [selectedTab]);

    const handleTabClick = (tabIndex: number) => {
        if (tabIndex === selectedTab) {
            setSelectedTab(-1)
        } else {
            setSelectedTab(tabIndex);
        }
    }

    const calculateTabsAndContentPerfectHeight = () => {
        const cookingTabs = document.querySelector('.cooking-tabs');
        const cookingTabsHeight = cookingTabs?.clientHeight + 1;
        console.log("Cooking tabs height: ", cookingTabsHeight);
        
        // Set height of cooking tabs to the height of the tabs so we can calculate of the content container
        cookingTabs?.setAttribute('style', 'height: ' + cookingTabsHeight + 'px;');
        const contentContainer = document.querySelector('.cooking-container .content-container');
        const contentContainerHeight = contentContainer?.clientHeight;
        contentContainer?.setAttribute('style', 'height: calc(100% - ' + cookingTabsHeight + 'px);');
    }

    return (
        <div className='common-container cooking-container'>
            <SecurityClearance 
                featureType={AppFeatureType.Cooking} 
                noClearanceNote={
                    <>Cooking</>
                }
                feature={
                    <>
                        <div className="cooking-tabs">
                            <TabButton classes={'cooking-tab ' + (selectedTab === 0 ? 'selected' : '')} text="Recipes" onClick={() => handleTabClick(0)} />
                            <TabButton classes={'cooking-tab ' + (selectedTab === 1 ? 'selected' : '')} text="Your Pantry" onClick={() => handleTabClick(1)} />
                            <TabButton classes={'cooking-tab ' + (selectedTab === 2 ? 'selected' : '')} text="Groceries" onClick={() => handleTabClick(2)} />
                        </div>
                        {selectedTab === 0 && (
                            <>
                                <ContainerRecipes />
                            </>
                        )}
                        {selectedTab === 1 && (
                            <>
                                <ContainerYourPantry />
                            </>
                        )}
                        {selectedTab === 2 && (
                            <>
                                <ContainerGroceries />
                            </>
                        )}
                    </>
                }
            />
        </div>
    );
}

export default Cooking;