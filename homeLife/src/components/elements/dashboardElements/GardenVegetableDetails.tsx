import { useEffect, useState } from "react";
import { CONST_VEGETABLE_DATA } from "../../VegetableData";
import GardenVegetableGridItem from "./GardenVegetableGridItem";
import { FilterAscending } from "../Button";
// https://plantprosperous.com/list-of-fruits-and-vegetables/

interface IGardenVegetableDetailsProps {
    handleAddToMyGarden: (name: string) => void;
    setSelectedVegetable: (name: string) => void;
}

function GardenVegetableDetails(props: IGardenVegetableDetailsProps) {
    const [selectedVegetable, setSelectedVegetable] = useState("");  // Also known as hardiness zone
    const [vegetableItems, setVegetableItems] = useState(CONST_VEGETABLE_DATA);
    const [isFilterAsc, setIsFilterAsc] = useState(false);

    useEffect(() => {
        if (isFilterAsc) {
            setVegetableItems(CONST_VEGETABLE_DATA.sort((a, b) => (a.name > b.name) ? 1 : -1));
        } else {
            setVegetableItems(CONST_VEGETABLE_DATA.sort((a, b) => (a.name > b.name) ? -1 : 1));
        }
    }, []);
    
    useEffect(() => {
        console.log("GardenVegetableDetails: useEffect: isFilterAsc: " + isFilterAsc);
        console.log("GardenVegetableDetails: useEffect: vegetableItems: ", vegetableItems);
        
        
        if (isFilterAsc) {
            setVegetableItems(CONST_VEGETABLE_DATA.sort((a, b) => (a.name > b.name) ? 1 : -1));
        } else {
            setVegetableItems(CONST_VEGETABLE_DATA.sort((a, b) => (a.name > b.name) ? -1 : 1));
        }
    }, [isFilterAsc]);

    const handleVegetableSelection = (name) => {
        if (selectedVegetable === name) {
            setSelectedVegetable("");
        } else {
            setSelectedVegetable(name);
            props.setSelectedVegetable(name);
        }
    }

    const handleVegetableSearchChange = (e) => {
        e.preventDefault();
        let searchValue = e.target.value;
        let newFruitItems = CONST_VEGETABLE_DATA.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setVegetableItems(newFruitItems);
    }

    return (
        <>
            <p>Check out different vegetables and learn more about them:</p>
            {/* Search field with button */}
            <div className="search-field">
                <input className="generic-search" type="text" placeholder="Search for a vegetable..." onChange={(e) => handleVegetableSearchChange(e)} />
            </div>
            {isFilterAsc ? (
                <FilterAscending isAsc={true} onClick={() => setIsFilterAsc(!isFilterAsc)} />
            ) : (
                <FilterAscending isAsc={false} onClick={() => setIsFilterAsc(!isFilterAsc)} />
            )}
            <div className="vegetable-grid">
                { vegetableItems.map((item, index) => (
                    <GardenVegetableGridItem 
                        key={index}
                        isSelected={selectedVegetable === item.name}
                        handleSelection={handleVegetableSelection}
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

export default GardenVegetableDetails;