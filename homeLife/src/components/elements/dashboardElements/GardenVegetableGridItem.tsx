import { useEffect, useState } from "react";
import { ModalGardenPlant } from "../Modal";
import { IGardenGridItemProps } from "./GardenFruitGridItem";

function GardenVegetableGridItem(props: IGardenGridItemProps) {
    const [isFileFound, setIsFileFound] = useState(false);

    useEffect(() => {
        // Check if file exists
        const checkIfFileExists = async () => {
            try {
                const response = await fetch(require("./../../../files/gardening/vegetable/" + props.image));
                if (response.status !== 404) {
                    setIsFileFound(true);
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        checkIfFileExists();
    });

    return (
        <>
            <div className={"vegetable-grid-item " + (props.isSelected ? ("selected") : (""))} onClick={() => props.handleSelection(props.name)}>
                {/* Make sure require() works on image */}
                { isFileFound ? (
                    <img src={ require("./../../../files/gardening/vegetable/" + props.image) } alt={ props.imageAlt } />   
                ) : (
                    <></>
                )}
                <h3>{ props.name }</h3>
                {props.isSelected ? (
                    <ModalGardenPlant 
                        title={props.name} 
                        type={props.type}
                        isSelected={props.isSelected} 
                        description={props.description} 
                        prerequisitesDescription={props.prerequisitesDescription} 
                        extraDescription={props.extraDescription}
                        companionPlants={props.companionPlants}
                        commonTasks={props.commonTasks}
                        commonDiseases={props.commonDiseases}
                        commonPests={props.commonPests}
                        storingAndPreserving={props.storingAndPreserving}
                        nutritionDescription={props.nutritionDescription}
                        nutrients={props.nutrients}
                        tags={props.tags}
                        nutrientSource={props.nutrientSource}    
                    />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default GardenVegetableGridItem;