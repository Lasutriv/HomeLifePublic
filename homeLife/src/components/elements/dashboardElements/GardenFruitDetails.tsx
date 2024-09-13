import { useState } from "react";
import GardenFruitGridItem from "./GardenFruitGridItem";
import { CONST_FRUIT_DATA } from "../../FruitData";
// https://plantprosperous.com/list-of-fruits-and-vegetables/

interface IGardenFruitDetailsProps {
    handleAddToMyGarden: (name: string) => void;
    setSelectedFruit: (name: string) => void;
}

function GardenFruitDetails(props: IGardenFruitDetailsProps) {
    const [selectedFruit, setSelectedFruit] = useState("");  // Also known as hardiness zone
    const [fruitItems, setFruitItems] = useState(CONST_FRUIT_DATA);

    const handleFruitSelection = (name) => {
        if (selectedFruit === name) {
            setSelectedFruit("");
        } else {
            setSelectedFruit(name);
            props.setSelectedFruit(name);
        }
    }

    // const handleFruitSearchClick = (e) => {
    //     e.preventDefault();
    // }

    const handleFruitSearchChange = (e) => {
        e.preventDefault();
        let searchValue = e.target.value;
        let newFruitItems = CONST_FRUIT_DATA.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setFruitItems(newFruitItems);
    }

    return (
        <>
            <p>Check out different fruits and learn more about them:</p>
            {/* Search field with button */}
            <div className="search-field">
                <input className="generic-search" type="text" placeholder="Search for a fruit..." onChange={(e) => handleFruitSearchChange(e)} />
            </div>
            <div className="fruit-grid">
                { fruitItems.map((item, index) => (
                    <GardenFruitGridItem 
                        key={index}
                        isSelected={selectedFruit === item.name}
                        handleSelection={handleFruitSelection}
                        handleAddToMyGarden={props.handleAddToMyGarden}
                        name={item.name}
                        type={item.type}
                        image={item.image}
                        imageAlt={item.imageAlt}
                        description={item.description}
                        prerequisitesDescription={item.prerequisitesDescription}
                        extraDescription={item.extraDescription}
                        companionPlants={item.companionPlants}
                        commonTasks={item.commonTasks}
                        commonDiseases={item.commonDiseases}
                        commonPests={item.commonPests}
                        storingAndPreserving={item.storingAndPreserving}
                        nutritionDescription={item.nutritionDescription}
                        nutrients={item.nutrients}
                        tags={item.tags}
                        nutrientSource={item.nutrientSource}
                    />
                ))}
            </div>
        </>
    );
}

export default GardenFruitDetails;