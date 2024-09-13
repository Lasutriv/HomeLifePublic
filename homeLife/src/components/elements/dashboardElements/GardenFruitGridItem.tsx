import { useEffect, useState } from "react";
import { ModalGardenPlant } from "../Modal";

export interface IGardenGridItemProps {
    isSelected: boolean;
    handleSelection: (name: string) => void;
    handleAddToMyGarden: (name: string) => void;
    name: string;
    type: string;
    image: string;
    imageAlt: string;
    description: string;
    prerequisitesDescription: string;
    extraDescription?: string;
    companionPlants?: string[];
    commonTasks?: string[];
    commonDiseases?: string[];
    commonPests?: string[];
    storingAndPreserving?: string;
    nutritionDescription?: string;
    // Dictionary of nutrients and their values
    nutrients?: { [key: string]: number };  // number is the percentage of daily value per 100g (3.5oz)
    tags?: string[];  // Tags for highlighted information. Colors are stored elsewhere.
    nutrientSource?: string;
}

function GardenFruitGridItem(props: IGardenGridItemProps) {
    const [isFileFound, setIsFileFound] = useState(false);

    useEffect(() => {
        // Check if file exists
        const checkIfFileExists = async () => {
            try {
                const response = await fetch(require("./../../../files/gardening/fruit/" + props.image));
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
            <div className={"fruit-grid-item " + (props.isSelected ? ("selected") : (""))} onClick={() => props.handleSelection(props.name)}>
                {/* Make sure require() works on image */}
                { isFileFound ? (
                    <img src={ require("./../../../files/gardening/fruit/" + props.image) } alt={ props.imageAlt } />   
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

export default GardenFruitGridItem;