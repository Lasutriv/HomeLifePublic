import { useEffect, useState } from "react";
import Modal, { ModalError, ModalGardenImage } from "./Modal";
import GardenForm from "../forms/GardenForm";
import { Button, ExitButton } from "./Button";
import Loading from "./Loading";
import { APIDeleteUserGarden, APIGetUserGarden, ReturnPropsAPIGetUserGarden } from "../../api/Common";
import GardenLayoutBuilder from "./dashboardElements/GardenLayoutBuilder";
import SecurityClearance, { AppFeatureType, AppSubFeatureType } from "../privateRoute/SecurityClearance";
import { Link } from "react-router-dom";

interface IGardenProps {
    id: number;
    name: string;
    description: string;
    imageRef: string;
    plants?: IPlantProps[];
}

interface IPlantProps {
    id: number;
    userId: number;
    gardenId: number;
    name: string;
    type: string;
}


function MyGarden() {
    const [gardens, setGardens] = useState([] as IGardenProps[]);
    const [isGardenSubmitModal, setIsGardenSubmitModal] = useState(false);
    const [isGardenModelShowing, setIsGardenModelShowing] = useState(false);
    const [selectedGarden, setSelectedGarden] = useState({} as IGardenProps);
    const [hasDeletedGarden, setHasDeletedGarden] = useState(false);
    const [showingMyGardenLayoutBuilder, setShowingMyGardenLayoutBuilder] = useState(false);
    const [showingMyGardenLayoutImage, setShowingMyGardenLayoutImage] = useState(false);
    const [gardenLayoutError, setGardenLayoutError] = useState("");
    
    useEffect(() => {
        // Get user's gardens from api and then subsequently get the plants in each garden
        const getGardens = async () => {
            const userGardens: ReturnPropsAPIGetUserGarden = await APIGetUserGarden();
            const gardens: IGardenProps[] = [];
            userGardens?.userGarden?.forEach((garden) => {
                // TODO: Get plants for garden

                gardens.push({
                    id: garden.id,
                    name: garden.name,
                    description: garden.description,
                    imageRef: garden.imageRef,
                    plants: []
                });
            });

            setGardens(gardens);
            setHasDeletedGarden(false);
        }

        getGardens();
    }, [isGardenSubmitModal, isGardenModelShowing, hasDeletedGarden]);

    const handleAddNewGarden = (e) => {
        setIsGardenModelShowing(true);
        e.preventDefault();
    }

    const handleOpenGardenLayoutBuilder = (e) => {
        setShowingMyGardenLayoutBuilder(true);
        e.preventDefault();
    }

    const handleClickViewGardenLayout = (gardenId) => {
        if (gardenId === undefined) {            
            setGardenLayoutError((prevstate) => "An issue has occurred.");
            return;
        } else {
            setSelectedGarden(gardens.find((garden) => garden.id === gardenId));
            // TODO: Check if there's even an image first before we try showing it. If there isn't, show an error.
            setShowingMyGardenLayoutImage(!showingMyGardenLayoutImage);
        }
    }

    const handleClickGarden = (gardenId: number) => {
        if (selectedGarden?.id === gardenId) {
            setSelectedGarden({} as IGardenProps);
        } else {
            setSelectedGarden(gardens.find((garden) => garden.id === gardenId));
        }
    }

    const handleDeleteGarden = (gardenId: number) => {
        const deleteGarden = async () => {
            const deleteResponse = await APIDeleteUserGarden(gardenId);
            if (deleteResponse?.status === 200) {
                setHasDeletedGarden(true);
            } else {
                console.log("Error deleting garden. Deletion response code: " + deleteResponse?.status + ".");
            }
        }

        deleteGarden();
        
    }

    return (
        <>
            <div className="my-garden-container">
                <div className="top-bar">
                    <Button text="Add Garden" onClick={ handleAddNewGarden }/>
                    <Button text="Open Garden Layout Builder" onClick={ handleOpenGardenLayoutBuilder }/>
                </div>
                <div className="my-garden-content">
                    {isGardenSubmitModal ? (
                        <Loading />
                    ) : (
                        <>
                            {/* Display all gardens */}
                            {gardens.map((garden, index) => (
                                <div className="garden-card-wrapper" key={index}>
                                    <div className={"garden-card " + (selectedGarden?.id === garden.id ? ("selected") : (""))} onClick={() => handleClickGarden(garden.id)} key={garden.id}>
                                        <ExitButton handleCallback={handleDeleteGarden} callbackParam={garden.id} />
                                        <div className="garden-card-info">
                                            <div className="garden-card-name">{garden.name}</div>
                                            <div className="garden-card-description">{garden.description}</div>
                                        </div>
                                    </div>
                                    <div className="garden-side-buttons">
                                        <Button text="" classes="min-size min-style borders-right" icon={<i className="fas fa-eye"></i>} onClick={() => {handleClickViewGardenLayout(garden.id)}} />
                                        <Button text="" classes="min-size min-style borders-right" icon={<i className="fas fa-edit"></i>} />
                                    </div>
                                </div>
                            ))}
                            {showingMyGardenLayoutBuilder && (
                                <SecurityClearance 
                                    featureType={AppFeatureType.Gardening} 
                                    subFeatureType={AppSubFeatureType.GardeningLayoutBuilder}
                                    noClearanceNote={
                                        <>Garden Layout Builder</>
                                    }
                                    noClearanceImage={
                                        <img src={require('../../files/upgrades/MHL-My-Garden-Layout-Builder.png')} alt="Garden Layout Builder" />
                                    }
                                    feature={
                                        <GardenLayoutBuilder 
                                            selectedGarden={selectedGarden}
                                            setGardenLayoutError={setGardenLayoutError}
                                            setShowingMyGardenLayoutBuilder={setShowingMyGardenLayoutBuilder}
                                        />
                                    }
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
            {isGardenModelShowing ? (
                <Modal form={<GardenForm isGardenSubmitModal={setIsGardenSubmitModal} isModelShowing={setIsGardenModelShowing} />} title="New garden" textInfo="Add a new garden to your collection." />
            ) : (
                <></>
            )}
            {showingMyGardenLayoutImage ? (
                <ModalGardenImage garden={selectedGarden} exitCallback={() => {handleClickViewGardenLayout(selectedGarden?.id)}} />
            ) : (
                <></>
            )}
            {/* Display garden layout error */}
            {gardenLayoutError !== "" ? (
                <ModalError title="Error" textInfo={gardenLayoutError} exitCallback={() => {setGardenLayoutError('')}} />
            ): (
                <></>
            )}
        </>
    );
}

export default MyGarden;