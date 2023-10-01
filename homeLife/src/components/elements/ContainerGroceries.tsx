// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Your Pantry page of the HomeLife app.

import '../../css/dashboards/Cooking.css';

import SecurityClearance, { AppFeatureType } from "../privateRoute/SecurityClearance";
import { useState } from "react";

function ContainerGroceries() {
    

    return (
        <div className='common-container cooking-container'>
            <SecurityClearance 
                featureType={AppFeatureType.Cooking} 
                noClearanceNote={
                    <>Cooking</>
                }
                feature={
                    <>
                        Groceries: Allows you to see what groceries you need to buy from your created list and hooks into the Your Pantry page to update your pantry when you mark an item as bought.
                    </>
                }
            />
        </div>
    );
}

export default ContainerGroceries;