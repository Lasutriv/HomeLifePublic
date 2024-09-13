// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Animals page of the HomeLife app.

import { useEffect, useState } from "react";

import './css/dashboards/Animals.css'
import { ExitButton } from "./components/elements/Button";
import AnimalForm from "./components/forms/AnimalForm";
import Modal from "./components/elements/Modal";
import { APIGETAnimalMeters, APIGETUserAnimals } from "./api/Common";
import SecurityClearance, { AppFeatureType } from "./components/privateRoute/SecurityClearance";
import AnimalDeleteForm from "./components/forms/AnimalFormDelete";
import GenericOkayForm from "./components/forms/GenericOkayForm";
import Loading from "./components/elements/Loading";
import { useAppSelector } from "./AppHooks";
import { SubscriptionPlan } from "./App";
import { Link } from "react-router-dom";
import AnimalMeterForm from "./components/forms/AnimalMeterForm";
import AnimalMeterDeleteForm from "./components/forms/AnimalMeterDeleteForm";
import { TruncateString } from "./components/Common";
// import { faSheep, faRam, faPig, faSquirrel, faRabbit, faMonkey, faDeer, faBird, faCrab, faTurtle,
//          faSnake, faRaccoon, faLobster, faFrog, faDuck, faDove, faCrow, faBee  } from "@fortawesome/pro-solid-svg-icons"

export interface IAnimalProps {
    id: number;
    name: string;
    type: string;
    breed: string;
    sex: string;
    age: number;
    weight: number;
    imageRef?: string;
    meters?: {
        id: number;
        type: meterType;
        value: number;
        total: number;
    }[];  // Holds a variety of meters for the animal
    prescriptions?: string[];
    surgeries?: string[];
    vaccinations?: string[];
    notes?: string;
}

// Food is based on hourly timeline while all others are based on a daily timeline
type meterType = 'food' | 'vet' | 'bath' | 'nails' | 'teeth';
const SUPPORTED_ANIMAL_ICONS = [
    'cat', 'dog', 'horse', 'cow', 'fish', 'shrimp', 'spider', 'frog', 'bugs', 'otter', 'sheep', 'ram',
    'pig', 'squirrel', 'rabbit', 'monkey', 'deer', 'bird', 'crab', 'turtle', 'snake', 'raccoon', 'lobster',
    'duck', 'dove', 'crow', 'bee', 'egg', 
];

function Animals() {
    const [animalsData, setAnimalsData] = useState<IAnimalProps[]>(null);
    // const [animalLists, setAnimalLists] = useState([]);
    // const [animalVetTimelines, setAnimalVetTimelines] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState<IAnimalProps>(null);
    const [selectedAnimalMeterId, setSelectedAnimalMeterId] = useState<number>(null);
    const [selectedAnimalOptions, setSelectedAnimalOptions] = useState<IAnimalProps>(null);
    // Modals
    const [isAnimalFormOpen, setIsAnimalFormOpen] = useState<boolean>(false);
    const [isAnimalSubmitFormOpen, setIsAnimalSubmitFormOpen] = useState<boolean>(false);
    const [isSureDeleteAnimalModal, setIsSureDeleteAnimalModal] = useState<boolean>(false);
    const [isSureDeleteAnimalSubmitModal, setIsSureDeleteAnimalSubmitModal] = useState<boolean>(false);
    const [isAnimalMeterFormOpen, setIsAnimalMeterFormOpen] = useState<boolean>(false);
    const [isAnimalMeterSubmitFormOpen, setIsAnimalMeterSubmitFormOpen] = useState<boolean>(false);
    const [isSureDeleteAnimalMeterModal, setIsSureDeleteAnimalMeterModal] = useState<boolean>(false);
    const [isSureDeleteAnimalMeterSubmitModal, setIsSureDeleteAnimalMeterSubmitModal] = useState<boolean>(false);
    const [showAnimalIconsInfo, setShowAnimalIconsInfo] = useState<boolean>(false); 
    const [isLoadingAnimalData, setIsLoadingAnimalData] = useState<boolean>(false);  // Used to show loading animation
    const userSubscription = useAppSelector(state => state.users.subscriptionPlan);

    useEffect(() => {
        console.log("Animals data: ", animalsData);
        
    }, [animalsData]);

    useEffect(() => {
        // Get animal data
        const getAnimalsResponse = async () => {
            setIsLoadingAnimalData(true);
            await APIGETUserAnimals().then(async (response) => {
                // console.log("Client received animal data: ", response);
                // Modify prescriptions, surgeries, and vaccinations to be arrays
                response.forEach((animal) => {
                    if (animal.prescriptions) {
                        animal.prescriptions = animal.prescriptions.split(',');
                        // Trim whitespace
                        animal.prescriptions.forEach((prescription, index) => {
                            animal.prescriptions[index] = prescription.trim();
                        });
                    }
                    if (animal.surgeries) {
                        animal.surgeries = animal.surgeries.split(',');
                        // Trim whitespace
                        animal.surgeries.forEach((surgery, index) => {
                            animal.surgeries[index] = surgery.trim();
                        });
                    }
                    if (animal.vaccinations) {
                        animal.vaccinations = animal.vaccinations.split(',');
                        // Trim whitespace
                        animal.vaccinations.forEach((vaccination, index) => {
                            animal.vaccinations[index] = vaccination.trim();
                        });
                    }
                });
                // Uppercase first letter of animal breed, prescriptions, surgeries, and vaccinations
                response.forEach((animal) => {
                    animal.breed = animal.breed.charAt(0).toUpperCase() + animal.breed.slice(1);
                    if (animal.prescriptions) {
                        animal.prescriptions.forEach((prescription, index) => {
                            animal.prescriptions[index] = prescription.charAt(0).toUpperCase() + prescription.slice(1);
                        });
                    }
                    if (animal.surgeries) {
                        animal.surgeries.forEach((surgery, index) => {
                            // console.log("Surgery: ", surgery);
                            
                            animal.surgeries[index] = surgery.charAt(0).toUpperCase() + surgery.slice(1);
                        });
                    }
                    if (animal.vaccinations) {
                        animal.vaccinations.forEach((vaccination, index) => {
                            animal.vaccinations[index] = vaccination.charAt(0).toUpperCase() + vaccination.slice(1);
                        });
                    }
                    if (animal.sex) {
                        animal.sex = animal.sex.charAt(0).toUpperCase() + animal.sex.slice(1);
                    }
                });

                // Get animal meter data
                let aggregatedAnimalsAfterMeterData = []
                const aggregatedAnimalData = await Promise.all(response.map(async (animal: IAnimalProps) => {
                    let newAnimal = {
                        ...animal,
                        meters: []
                    }                    
                    const meterResponse = await APIGETAnimalMeters(newAnimal.id);  
                    meterResponse.forEach((meter) => {
                        newAnimal.meters.push({
                            id: meter.id,
                            type: meter.type,
                            value: meter.value,
                            total: meter.total
                        });
                    });
                    console.log("New animal: ", newAnimal);
                    
                    
                    return newAnimal;
                }));
                setAnimalsData(aggregatedAnimalData);
                setIsLoadingAnimalData(false);
                setSelectedAnimal(null);
            }).catch((error) => {
                console.log("Client received error during animal data fetch: ", error);
                setIsLoadingAnimalData(false);
            });
        };

        getAnimalsResponse();
    }, [isSureDeleteAnimalSubmitModal, isAnimalSubmitFormOpen, isAnimalMeterSubmitFormOpen, isSureDeleteAnimalMeterSubmitModal]);

    const handleAnimalAddClick = () => {
        // Show animal form
        setIsAnimalFormOpen(true);
    }
    const handleAnimalSelected = (animal: IAnimalProps) => {
        if (selectedAnimal && selectedAnimal.id === animal.id) {
            setSelectedAnimal(null);
        } else {
            setSelectedAnimal(animal);
        }
    }
    const handleAnimalAddMeterClick = (animal: IAnimalProps) => {
        // Set selected animal
        setSelectedAnimal(animal);
        // Show animal meter form
        setIsAnimalMeterFormOpen(true);
    }

    const handleOptionsMenuClick = (animal: IAnimalProps) => {
        // Show options menu
        if (selectedAnimalOptions && selectedAnimalOptions.id === animal.id) {
            setSelectedAnimalOptions(null);
        } else {
            setSelectedAnimalOptions(animal);
        }
    }

    const handleEditAnimalClick = (animal) => {
        // Set selected animal
        setSelectedAnimal(animal);
        // Show animal edit form

    }

    const handleDeleteAnimalClick = async (animal) => {
        // Set selected animal
        setSelectedAnimal(animal);
        // Show delete animal modal
        setIsSureDeleteAnimalModal(true);
    }

    const handleDeleteAnimalMeterClick = async (animal, meterId) => {
        // Set selected animal
        setSelectedAnimal(animal);
        // Set selected animal meter id
        setSelectedAnimalMeterId(meterId);
        // Show delete animal meter modal
        setIsSureDeleteAnimalMeterModal(true);
    }

    const handleAnimalIconsInfoClick = () => {
        // Show animal icons info
        setShowAnimalIconsInfo(!showAnimalIconsInfo);
    }

    return (
        <div className='common-container animals-container'>
            <SecurityClearance 
                featureType={AppFeatureType.Animals} 
                feature={
                    <>
                        <div className="animal-info-open" onClick={handleAnimalIconsInfoClick}>
                            <i className="fa-solid fa-circle-info"></i>
                        </div>
                        Animal Highlight
                        <div className="highlight-container">
                            <div className="highlight-container-left">
                                {/* <img src={selectedAnimal ? selectedAnimal.imageRef : ""} alt={selectedAnimal ? selectedAnimal.name : ""} /> */}
                            </div>
                            <div className="highlight-container-right">
                                <div className="highlight-notes">
                                    {selectedAnimal ? selectedAnimal.notes : ""}
                                </div>
                            </div>
                        </div>
                        <div className="animal-header">
                            <div className="title">Your Gathering of Animals</div>
                            <div className="current-animals-container">
                                {isLoadingAnimalData ? (
                                    <Loading />
                                ) : (
                                    <>
                                        {animalsData?.map((animal) => {
                                            return (
                                                <div className="animal-container-wrapper" key={animal.id}>
                                                    <div className="options-menu"
                                                        onClick={
                                                            () => { handleOptionsMenuClick(animal) }
                                                        }
                                                    >
                                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                                        <div className={"options-menu-content " + (selectedAnimalOptions && selectedAnimalOptions.id === animal.id ? "show" : "")}>
                                                        <div className="option" onClick={() => {handleAnimalSelected(animal)}}>{ selectedAnimal && selectedAnimal.id === animal.id ? "Unselect" : "Select" }</div>
                                                            <div className="option" onClick={() => {handleEditAnimalClick(animal)}}>Edit</div>
                                                            <div className="option" onClick={() => {handleDeleteAnimalClick(animal)}}>Delete</div>
                                                        </div>
                                                    </div>
                                                    <div 
                                                        className={"animal-container " + (selectedAnimal && selectedAnimal.id === animal.id ? "selected" : "")} 
                                                    >
                                                        <div className="animal-type">
                                                            {/* {animal.type === "Cat" ? <i className="fas fa-cat"></i> : <i className="fas fa-dog"></i>} */}
                                                            <i className={"fas fa-" + animal.type.toLowerCase()}></i>
                                                        </div>
                                                        {animal.imageRef && (
                                                            <div className="animal-image">
                                                                {/* <img src={animal?.imageRef} alt={animal.name} /> */}
                                                            </div>
                                                        )}
                                                        <div className="animal-info">
                                                            <div className="animal-name-breed-sex">
                                                                {animal.name} | {animal.breed} | {animal.sex}
                                                            </div>
                                                            <div className="animal-age-weight">
                                                                <div className="age">
                                                                    {animal.age} years old
                                                                </div>
                                                                <div className="weight">
                                                                    {animal.weight} lbs
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="meters-container">
                                                            <div className="title">
                                                                Meters: 
                                                            </div>
                                                            <div className="meters-add">
                                                                <i className="fas fa-plus-circle" onClick={() => {handleAnimalAddMeterClick(animal)}}/>
                                                            </div>
                                                            <div className="meters">
                                                                {animal.meters.map((meter, index) => {
                                                                    if (meter.type === 'food') {
                                                                        return (
                                                                            <div className="meter food" key={meter.id}>
                                                                                {/* @ts-ignore */}
                                                                                <div className="meter-name">{TruncateString(meter.type.toUpperCase().split('')[0] + meter.type.toLowerCase().slice(1), 8)}</div>
                                                                                <div className="meter-bar" style={{width: '100%'}}>
                                                                                    <div className="meter-fill brown" style={{width: ((meter.value / meter.total) * 100) + "%"}}></div>
                                                                                </div>
                                                                                <i className="fas fa-times-circle" onClick={() => {handleDeleteAnimalMeterClick(animal, meter.id)}}></i>
                                                                            </div>
                                                                        );
                                                                    } else if(meter.type === 'vet') {
                                                                        return (
                                                                            <div className="meter vet" key={meter.id}>
                                                                                {/* @ts-ignore */}
                                                                                <div className="meter-name">{TruncateString(meter.type.toUpperCase().split('')[0] + meter.type.toLowerCase().slice(1), 8)}</div>
                                                                                <div className="meter-bar" style={{width: '100%'}}>
                                                                                    <div className="meter-fill red" style={{width: ((meter.value / meter.total) * 100) + "%"}}></div>
                                                                                </div>
                                                                                <i className="fas fa-times-circle" onClick={() => {handleDeleteAnimalMeterClick(animal, meter.id)}}></i>
                                                                            </div>
                                                                        );
                                                                    } else if (meter.type === 'bath') {
                                                                        return (
                                                                            <div className="meter bath" key={meter.id}>
                                                                                {/* @ts-ignore */}
                                                                                <div className="meter-name">{TruncateString(meter.type.toUpperCase().split('')[0] + meter.type.toLowerCase().slice(1), 8)}</div>
                                                                                <div className="meter-bar" style={{width: '100%'}}>
                                                                                    <div className="meter-fill blue" style={{width: ((meter.value / meter.total) * 100) + "%"}}></div>
                                                                                </div>
                                                                                <i className="fas fa-times-circle" onClick={() => {handleDeleteAnimalMeterClick(animal, meter.id)}}></i>
                                                                            </div>
                                                                        );
                                                                    } else if (meter.type === 'nails') {
                                                                        return (
                                                                            <div className="meter nails" key={meter.id}>
                                                                                {/* @ts-ignore */}
                                                                                <div className="meter-name">{TruncateString(meter.type.toUpperCase().split('')[0] + meter.type.toLowerCase().slice(1), 8)}</div>
                                                                                <div className="meter-bar" style={{width: '100%'}}>
                                                                                    <div className="meter-fill white" style={{width: ((meter.value / meter.total) * 100) + "%"}}></div>
                                                                                </div>
                                                                                <i className="fas fa-times-circle" onClick={() => {handleDeleteAnimalMeterClick(animal, meter.id)}}></i>
                                                                            </div>
                                                                        );
                                                                    } else if (meter.type === 'teeth') {
                                                                        return (
                                                                            <div className="meter teeth" key={meter.id}>
                                                                                {/* @ts-ignore */}
                                                                                <div className="meter-name">{TruncateString(meter.type.toUpperCase().split('')[0] + meter.type.toLowerCase().slice(1), 8)}</div>
                                                                                <div className="meter-bar" style={{width: '100%'}}>
                                                                                    <div className="meter-fill yellow" style={{width: ((meter.value / meter.total) * 100) + "%"}}></div>
                                                                                </div>
                                                                                <i className="fas fa-times-circle" onClick={() => {handleDeleteAnimalMeterClick(animal, meter.id)}}></i>
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <div className="meter other" key={meter.id}>
                                                                                {/* @ts-ignore */}
                                                                                <div className="meter-name">{TruncateString(meter.type.toUpperCase().split('')[0] + meter.type.toLowerCase().slice(1), 8)}</div>
                                                                                <div className="meter-bar" style={{width: '100%'}}>
                                                                                    <div className="meter-fill other" style={{width: ((meter.value / meter.total) * 100) + "%"}}></div>
                                                                                </div>
                                                                                <i className="fas fa-times-circle" onClick={() => {handleDeleteAnimalMeterClick(animal, meter.id)}}></i>
                                                                            </div>
                                                                        );
                                                                    }
                                                                })}
                                                                {/* {animal.meters?.[0]?.value > 0 && animal.meters?.[0]?.total > 0 ? (
                                                                    <div className="meter-bar" style={{width: '100%'}}>
                                                                        <div className="meter-fill brown" style={{width: ((animal.meters?.[0].value / animal.meters?.[0].total) * 100) + "%"}}></div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="meter-bar" style={{width: '100%'}}>
                                                                        <div className="meter-fill brown" style={{width: 0}}></div>
                                                                    </div>
                                                                )} */}
                                                                {/* TODO: Map vet timelines  */}
                                                                {/* <div className="meter vet">
                                                                    {animal.meters?.[1]?.value > 0 && animal.meters?.[1]?.total > 0 ? (
                                                                        <div className="meter-bar" style={{width: '100%'}}>
                                                                            <div className="meter-fill red" style={{width: ((animal.meters?.[1].value / animal.meters?.[1].total) * 100) + "%"}}></div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="meter-bar" style={{width: '100%'}}>
                                                                            <div className="meter-fill red" style={{width: 0}}></div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="meter bath">
                                                                    {animal.meters?.[2]?.value && animal.meters?.[2]?.total ? (
                                                                        <div className="meter-bar" style={{width: '100%'}}>
                                                                            <div className="meter-fill blue" style={{width: ((animal.meters?.[2].value / animal.meters?.[2].total) * 100) + "%"}}></div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="meter-bar" style={{width: '100%'}}>
                                                                            <div className="meter-fill red" style={{width: 0}}></div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="meter nails">
                                                                    {animal.meters?.[3]?.value && animal.meters?.[3]?.total ? (
                                                                        <div className="meter-bar" style={{width: '100%'}}>
                                                                            <div className="meter-fill white" style={{width: ((animal.meters?.[3].value / animal.meters?.[3].total) * 100) + "%"}}></div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="meter-bar" style={{width: '100%'}}>
                                                                            <div className="meter-fill red" style={{width: 0}}></div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="meter teeth">
                                                                    {animal.meters?.[4]?.value && animal.meters?.[4]?.total ? (
                                                                        <div className="meter-bar" style={{width: '100%'}}>
                                                                            <div className="meter-fill yellow" style={{width: ((animal.meters?.[4].value / animal.meters?.[4].total) * 100) + "%"}}></div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="meter-bar" style={{width: '100%'}}>
                                                                            <div className="meter-fill red" style={{width: 0}}></div>
                                                                        </div>
                                                                    )}
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                        <div className="prescriptions-container">
                                                            <div className="title">Prescriptions: </div>
                                                            <div className="prescriptions">
                                                                {animal.prescriptions && animal.prescriptions?.map((prescription, index) => {
                                                                    if (index === animal.prescriptions.length - 1) {
                                                                        return (
                                                                            <div className="prescription" key={prescription}>
                                                                                {prescription}
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <div className="prescription" key={prescription}>
                                                                                {prescription},&nbsp;
                                                                            </div>
                                                                        );
                                                                    }

                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className="surgeries-container">
                                                            <div className="title">Surgeries: </div>
                                                            <div className="surgeries">
                                                                {animal.surgeries && animal.surgeries?.map((surgery, index) => {
                                                                    if (index === animal.surgeries.length - 1) {
                                                                        return (
                                                                            <div className="surgery" key={surgery}>
                                                                                {surgery}
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <div className="surgery" key={surgery}>
                                                                                {surgery},&nbsp;
                                                                            </div>
                                                                        );
                                                                    }
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className="vaccinations-container">
                                                            <div className="title">Vaccinations: </div>
                                                            <div className="vaccinations">
                                                                {animal.vaccinations && animal.vaccinations?.map((vaccination, index) => {
                                                                    if (index === animal.vaccinations.length - 1) {
                                                                        return (
                                                                            <div className="vaccination" key={vaccination}>
                                                                                {vaccination}
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <div className="vaccination" key={vaccination}>
                                                                                {vaccination},&nbsp;
                                                                            </div>
                                                                        );
                                                                    }
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className="notes-container">
                                                            <div className="title">Notes: </div>
                                                            <div className="notes">{animal.notes}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                )}
                                <div className="add-animal-container">
                                    {/* Add icon */}
                                    {(animalsData?.length < 5 && userSubscription === SubscriptionPlan.Free) || (animalsData?.length < 25 && userSubscription === SubscriptionPlan.Base)
                                     || (userSubscription === SubscriptionPlan.Packed) ? (
                                        <i className="fas fa-plus-circle" onClick={handleAnimalAddClick}></i>
                                    ) : (
                                        <p>Free plan can only accommodate 5 animals. Upgrade to the <Link to="/pricing">Base or Packed</Link> plan to add more.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                }
            />
            {isAnimalSubmitFormOpen && (
                <GenericOkayForm title="Submitted!" description="Your animal has been added from your gathering." isShowingGenericOkayForm={setIsAnimalSubmitFormOpen}/>
            )}
            {isAnimalFormOpen && (
                <Modal
                    title="Add Animal" 
                    textInfo="Add an animal by filling in the below information."
                    form={<AnimalForm isAnimalSubmitModal={setIsAnimalSubmitFormOpen} isModelShowing={setIsAnimalFormOpen} />}
                />
            )}
            {isSureDeleteAnimalSubmitModal && (
                <GenericOkayForm title="Submitted!" description="Your animal has been removed from your gathering." isShowingGenericOkayForm={setIsSureDeleteAnimalSubmitModal}/>
            )}
            {isSureDeleteAnimalModal && (
                <Modal 
                    title={"Delete Animal"}
                    textInfo={"Are you sure you want to remove " + selectedAnimal?.name + " from your gathering?"}
                    form={<AnimalDeleteForm animal={selectedAnimal} isAnimalSubmitModal={setIsSureDeleteAnimalSubmitModal} isModelShowing={setIsSureDeleteAnimalModal} />}
                />
            )}
            {isAnimalMeterSubmitFormOpen && (
                <GenericOkayForm title="Submitted!" description={"Your animal meter has been added to " + selectedAnimal?.name + "."} isShowingGenericOkayForm={setIsAnimalMeterSubmitFormOpen}/>
            )}
            {isAnimalMeterFormOpen && (
                <Modal
                    title="Add Animal Meter" 
                    textInfo="Add an animal meter by filling in the below information."
                    form={<AnimalMeterForm selectedAnimal={selectedAnimal} isAnimalMeterSubmitModal={setIsAnimalMeterSubmitFormOpen} isModelShowing={setIsAnimalMeterFormOpen} />}
                />
            )}
            {isSureDeleteAnimalMeterSubmitModal && (
                <GenericOkayForm title="Submitted!" description={"Your animal meter has been removed from " + selectedAnimal?.name + "."} isShowingGenericOkayForm={setIsSureDeleteAnimalMeterSubmitModal}/>
            )}
            {isSureDeleteAnimalMeterModal && (
                <Modal 
                    title={"Delete Animal Meter"}
                    textInfo={"Are you sure you want to remove this meter from " + selectedAnimal?.name + "?"}
                    form={<AnimalMeterDeleteForm animal={selectedAnimal} meterId={selectedAnimalMeterId} isAnimalDeleteSubmitModal={setIsSureDeleteAnimalMeterSubmitModal} isModelShowing={setIsSureDeleteAnimalMeterModal} />}
                />
            )}
            {showAnimalIconsInfo && (
                <div className="modal-container animal-icon-info">
                    <ExitButton handleCallback={() => { setShowAnimalIconsInfo(false) }} />
                    <h3>Animal icons</h3>
                    <hr />
                    <div className="content">
                        <span>Currently, we support the following animals:</span>
                        <div className="animal-icons">
                            {SUPPORTED_ANIMAL_ICONS.map((icon) => {
                                return (
                                    <div className="animal-icon" key={icon}>
                                        {/* <FontAwesomeIcon icon={icon} /> */}
                                        <i className={"fas fa-" + icon}></i>
                                        <div className="animal-icon-name">{icon}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Animals;