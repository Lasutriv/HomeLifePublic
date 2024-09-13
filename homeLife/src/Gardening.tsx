// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Gardening page of the HomeLife app.
// A potential open source hardiness map: https://github.com/kgjenkins/ophz
// Good example of what we'd like to include in information: // https://www.missouribotanicalgarden.org/gardens-gardening/your-garden/help-for-the-home-gardener/advice-tips-resources/gardening-by-month
// Information on plant hardiness: https://www.marthastewart.com/8375670/usda-plant-hardiness-zones

import './css/dashboards/Gardening.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GardenMonthDetails from './components/elements/dashboardElements/GardenMonthDetails';
import { TabButton } from './components/elements/Button';
import GardenFruitDetails from './components/elements/dashboardElements/GardenFruitDetails';
import GardenVegetableDetails from './components/elements/dashboardElements/GardenVegetableDetails';
import MyGarden from './components/elements/MyGarden';
import { APIGetUserSettings } from './api/Common';
import GardenHardinessMap from './components/elements/dashboardElements/GardenHardinessMap';
import GardenHerbDetails from './components/elements/dashboardElements/GardenHerbDetails';
import { checkScreenSizeMobile } from './components/Common';
import SecurityClearance, { AppFeatureType, AppSubFeatureType } from './components/privateRoute/SecurityClearance';

function Gardening() {
    const [gardeningZone, setGardeningZone] = useState(0);  // Also known as hardiness zone
    const [selectedFruit, setSelectedFruit] = useState("");
    const [selectedVegetable, setSelectedVegetable] = useState("");
    const [selectedHerb, setSelectedHerb] = useState("");
    // 0 = General, 1 = Plants, 2 = Fruits, 3 = Lawns, 4 = Ornaments, 5 = Miscellaneous
    const [selectionNumber, setSelectionNumber] = useState(0);
    let { month } = useParams();

    useEffect(() => {
        // Get user's gardening zone from local storage. If not found, ping the server for the user's gardening zone. If not found,
        // suggest the user to enter their gardening zone or location.
        const getGardeningZone = async () => {
            const getUserSettingsResponse = await APIGetUserSettings();
            console.log("Client side received response for getting user settings: ", getUserSettingsResponse.response[0]);
                
            setGardeningZone(getUserSettingsResponse?.response?.[0]?.hardinessZone ? getUserSettingsResponse.response[0].hardinessZone : 0);
        }

        getGardeningZone();
    }, []);

    useEffect(() => {
        // Check if user has screen size under 768px
        if (checkScreenSizeMobile()) {
            document.getElementsByClassName('by-month')[0].classList.remove('col-2');
            document.getElementsByClassName('by-month')[0].classList.add('col-4');
            document.getElementsByClassName('current-month')[0].classList.remove('col-10');
            document.getElementsByClassName('current-month')[0].classList.add('col-8');
        }

        // Add event listener for screen size
        window.addEventListener('resize', checkScreenSizeMobile);
    }, []);

    const handleAddToMyGarden = (name: string, type: string) => {
        // Check if it's a fruit or vegetable
        if (type === "Fruit") {
            
        } else if (type === "Vegetable") {

        } else if (type === "Herb") {

        }
    }

    const handleSelectGeneral = (e) => {
        setSelectionNumber(0);
        e.preventDefault();
    }

    const handleSelectFruits = (e) => {
        setSelectionNumber(1);
        e.preventDefault();
    }

    const handleSelectVegetables = (e) => {
        setSelectionNumber(2);
        e.preventDefault();
    }

    const handleSelectHerbs = (e) => {
        setSelectionNumber(3);
        e.preventDefault();
    }

    const handleSelectMyGarden = (e) => {
        setSelectionNumber(4);
        e.preventDefault();
    }

    // const handleSelectOrnaments = (e) => {
    //     setSelectionNumber(4);
    //     e.preventDefault();
    // }

    // const handleSelectMiscellaneous = (e) => {
    //     setSelectionNumber(5);
    //     e.preventDefault();
    // }

    return (
        <div className='common-container gardening-container'>
            <SecurityClearance 
                featureType={AppFeatureType.Gardening} 
                subFeatureType={AppSubFeatureType.GardeningWiki}
                feature={
                    <>
                        <div className='top-bar'>
                            <div className='garden-options'>
                                <TabButton classes={selectionNumber === 0 ? ('selected') : ('')} text='General' onClick={handleSelectGeneral}/>
                                <TabButton classes={selectionNumber === 1 ? ('selected') : ('')} text='Fruits' onClick={handleSelectFruits}/>
                                <TabButton classes={selectionNumber === 2 ? ('selected') : ('')} text='Vegetables' onClick={handleSelectVegetables}/>
                                <TabButton classes={selectionNumber === 3 ? ('selected') : ('')} text='Herbs' onClick={handleSelectHerbs}/>
                                <TabButton classes={selectionNumber === 4 ? ('selected') : ('')} text='My Garden' onClick={handleSelectMyGarden}/>
                                {/* <TabButton classes={selectionNumber == 4 ? ('selected') : ('')} text='Ornaments' onClick={handleSelectOrnaments}/>
                                <TabButton classes={selectionNumber == 5 ? ('selected') : ('')} text='Miscellaneous' onClick={handleSelectMiscellaneous}/> */}
                            </div>
                            <div className='gardening-zone'>
                                <h3>Your Hardiness Zone: { gardeningZone }</h3>
                            </div>
                        </div>
                        <div className='content-container'>
                            <div className='row'>
                                <div className='current-month col-10'>
                                    {selectionNumber === 0 && (
                                        <>
                                            <h3>Newcomers</h3>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <p>If new, check out our getting started guide <a href="#">here</a>.</p>
                                            <h3>Gardening Tips and Tricks</h3>
                                            <p>Here are some tips and tricks for gardening in the month of <span className="word-highlight">{month == null ? new Date().toLocaleString('default', { month: 'long' }) : month.charAt(0).toUpperCase() + month.slice(1)}</span>.</p>
                                            <h3>Hardiness Map</h3>
                                            <GardenHardinessMap />
                                            <GardenMonthDetails month={month == null ? new Date().toLocaleString('default', { month: 'long' }) : month.charAt(0).toUpperCase() + month.slice(1)} />
                                        </>
                                    )}
                                    {selectionNumber === 1 && (
                                        <GardenFruitDetails handleAddToMyGarden={() => {handleAddToMyGarden(selectedFruit, "Fruit")}} setSelectedFruit={setSelectedFruit} />
                                    )}
                                    {selectionNumber === 2 && (
                                        <GardenVegetableDetails handleAddToMyGarden={() => {handleAddToMyGarden(selectedVegetable, "Vegetable")}} setSelectedVegetable={setSelectedVegetable} />
                                    )}
                                    {selectionNumber === 3 && (
                                        <GardenHerbDetails handleAddToMyGarden={() => {handleAddToMyGarden(selectedHerb, "Herb")}} setSelectedHerb={setSelectedHerb} />
                                    )}
                                    {selectionNumber === 4 && (
                                        <MyGarden />
                                    )}
                                </div>
                                <div className='by-month col-2'>
                                    <h3>By Month</h3>
                                    <ul>
                                        <li>
                                            <a href='/gardening/january'>January</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/february'>February</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/march'>March</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/april'>April</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/may'>May</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/june'>June</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/july'>July</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/august'>August</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/september'>September</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/october'>October</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/november'>November</a>
                                        </li>
                                        <li>
                                            <a href='/gardening/december'>December</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                }
            />
        </div>
    );
}

export default Gardening;