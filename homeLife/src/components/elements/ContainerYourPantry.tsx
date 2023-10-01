// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Your Pantry page of the HomeLife app.

import '../../css/dashboards/Cooking.css';

import SecurityClearance, { AppFeatureType } from "../privateRoute/SecurityClearance";
import { useState } from "react";

function ContainerYourPantry() {
    

    return (
        <div className='common-container pantry-container'>
            <SecurityClearance 
                featureType={AppFeatureType.Cooking} 
                noClearanceNote={
                    <>Cooking</>
                }
                feature={
                    <>
                        <div className='header-intro'>
                            <img src={require('../../files/splashScreens/Cooking-Pantry-Opening-Screen-Splashscreen-Clean.png')} alt='Pantry splash screen'/>
                        </div>
                        <div className='pantry-content'>
                            <img src={require('../../files/splashScreens/Cooking-Pantry-Cutting-Board-Splashscreen.png')} alt='Pantry cutting board splash screen'/>
                            <div className='info'>
                                Your Pantry: Allows you to see what ingredients you have in your pantry, and what recipes you can make with those ingredients.
                            </div>
                        </div>
                    </>
                }
            />
        </div>
    );
}

export default ContainerYourPantry;