import { useState } from "react";
import { CONST_HERB_DATA } from "../../HerbData";
import GardenHerbGridItem from "./GardenHerbGridItem";
// https://plantprosperous.com/list-of-fruits-and-herbs/

interface IGardenHerbDetailsProps {
    handleAddToMyGarden: (name: string) => void;
    setSelectedHerb: (name: string) => void;
}

function GardenHerbDetails(props: IGardenHerbDetailsProps) {
    const [selectedHerb, setSelectedHerb] = useState("");  // Also known as hardiness zone
    const [herbItems, setHerbItems] = useState(CONST_HERB_DATA);

    const handleHerbSelection = (name) => {
        if (selectedHerb === name) {
            setSelectedHerb("");
        } else {
            setSelectedHerb(name);
            props.setSelectedHerb(name);
        }
    }

    const handleHerbSearchChange = (e) => {
        e.preventDefault();
        let searchValue = e.target.value;
        let newFruitItems = CONST_HERB_DATA.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setHerbItems(newFruitItems);
    }

    return (
        <>
            <p>Check out different herbs and learn more about them:</p>
            {/* Search field with button */}
            <div className="search-field">
                <input className="generic-search" type="text" placeholder="Search for an herb..." onChange={(e) => handleHerbSearchChange(e)} />
            </div>
            <div className="herb-grid">
                { herbItems.map((item, index) => (
                    <GardenHerbGridItem 
                        key={index}
                        isSelected={selectedHerb === item.name}
                        handleSelection={handleHerbSelection}
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

export default GardenHerbDetails;