import { useEffect, useState } from "react";
import { IUserProps } from "../../../Dashboard";
import { Button } from "../Button";
import { APIPostAddUserSettings, APIPostUpdateUserSettings, APIGetUserSettings } from "../../../api/Common";


function SettingsAccountInformation() {
    const [user, setUser] = useState({} as IUserProps);
    const [weatherLocation, setWeatherLocation] = useState('');  // Rolla, MO is an example
    const [hardinessZone, setHardinessZone] = useState(-1);
    const [temperatureUnit, setTemperatureUnit] = useState('F');
    // Editing user settings
    const [isEditingWeatherLocation, setIsEditingWeatherLocation] = useState(false);
    const [isEditingHardinessZone, setIsEditingHardinessZone] = useState(false);
    const [isEditingTemperatureUnit, setIsEditingTemperatureUnit] = useState(false);
    // const [isSaving, setIsSaving] = useState(false);
    // const [isCancelling, setIsCancelling] = useState(false);

    // Attempt to retrieve user settings from server over time
    useEffect(() => {
        const interval = setInterval(async() => {
            // Get user email
            let currentUser: IUserProps = JSON.parse(localStorage.getItem('user'));

            // Set user
            setUser(currentUser);

            const getUserSettingsResponse = await APIGetUserSettings();
            // console.log("[Interval Call]: Client side received response for getting user settings: ", getUserSettingsResponse?.response?.[0]);
            if (getUserSettingsResponse?.response?.[0] === undefined) { return; } 
            if (getUserSettingsResponse?.response?.[0]?.hardinessZone !== 'undefined' && getUserSettingsResponse?.response?.[0]?.hardinessZone !== undefined) { 
                setHardinessZone(getUserSettingsResponse?.response?.[0]?.hardinessZone); 
            }
            if (getUserSettingsResponse?.response?.[0]?.temperatureUnit !== 'undefined' && getUserSettingsResponse?.response?.[0]?.temperatureUnit !== undefined) { 
                setTemperatureUnit(getUserSettingsResponse?.response?.[0]?.temperatureUnit); 
            }
            if (getUserSettingsResponse?.response?.[0]?.location !== 'undefined' && getUserSettingsResponse?.response?.[0]?.location !== undefined) { 
                setWeatherLocation(getUserSettingsResponse?.response?.[0]?.location); 
            }
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Get user email
        let currentUser: IUserProps = JSON.parse(localStorage.getItem('user'));

        // Set user
        setUser(currentUser);
    }, []);
    
    const handleSaveAccountSettingsToServer = async () => {
        // setIsSaving(true);       
        
        // Try to add user settings to server first. If not successful, then update user settings.
        const addResponse = await APIPostAddUserSettings(hardinessZone, temperatureUnit, weatherLocation);
        if (addResponse != null || addResponse !== undefined) {
            // console.log("[Saving]: Client side received response for adding user settings: ", addResponse);
            if (addResponse[0]?.error === "User already exists.") {
                const saveResponsee = await APIPostUpdateUserSettings(hardinessZone, temperatureUnit, weatherLocation);
                console.log("[Saving]: Client side received response for updating user settings: ", saveResponsee);
                
            } else {
                // console.log("User settings saved.");
                
            }
        }

        // Load new user settings
        const getUserSettingsResponse = await APIGetUserSettings();
        // console.log("[Loading]: Client side received response for getting user settings: ", getUserSettingsResponse?.response?.[0]);
        if (getUserSettingsResponse?.response?.[0] === undefined) { return; }
        if (getUserSettingsResponse?.response?.[0]?.hardinessZone !== 'undefined' && getUserSettingsResponse?.response?.[0]?.hardinessZone !== undefined) { 
            setHardinessZone(getUserSettingsResponse?.response?.[0]?.hardinessZone); 
        }
        if (getUserSettingsResponse?.response?.[0]?.temperatureUnit !== 'undefined' && getUserSettingsResponse?.response?.[0]?.temperatureUnit !== undefined) { 
            setTemperatureUnit(getUserSettingsResponse?.response?.[0]?.temperatureUnit); 
        }
        if (getUserSettingsResponse?.response?.[0]?.location !== 'undefined' && getUserSettingsResponse?.response?.[0]?.location !== undefined) { 
            setWeatherLocation(getUserSettingsResponse?.response?.[0]?.location); 
        }

        setIsEditingWeatherLocation(false);
        setIsEditingHardinessZone(false);
        setIsEditingTemperatureUnit(false);
    };

    const handleCancelEdits = () => {
        // setIsCancelling(true);
        setIsEditingWeatherLocation(false);
        setIsEditingHardinessZone(false);
        setIsEditingTemperatureUnit(false);
    };

    const handleEditChangeWeatherLocation = (e) => {
        setIsEditingWeatherLocation(true);
    };

    const handleEditChangeHardinessZone = (e) => {
        setIsEditingHardinessZone(true);
    };

    const handleEditChangeTemperatureUnit = (e) => {
        setIsEditingTemperatureUnit(true);
    };

    // const handleDeleteAllUserSettings = async () => {
    //     const deleteAllResponse = await APIGetDeleteAllUserSettings();
    // };

    return (
        <>
            <div className='settings-account-information'>
                <h3>Account Information</h3>
                <div className='settings-account-information-content'>
                    <div className="header">
                        <h5>Name: { user.firstName } { user.lastName }</h5>
                        <h5>Email: { user.email }</h5>
                    </div>
                    <div className="account-weather-details">
                        {isEditingWeatherLocation ? (
                            <>
                                <h5>Weather Location: <input type="text" value={ weatherLocation } onChange={ (e) => {setWeatherLocation(e.target.value)} } /></h5>
                            </>
                        ) : (
                            <h5>Weather Location: { weatherLocation }<Button text="" classes="min-size min-style borders-right" icon={<i className="fas fa-edit"></i>} onClick={handleEditChangeWeatherLocation} /></h5>
                        )}
                    </div>
                    <div className="account-garden-details">
                        {isEditingHardinessZone ? (
                            <>
                                <h5>
                                    Hardiness Zone:
                                    {/* Make sure to update select with option value */}
                                    <select 
                                        value={ hardinessZone } 
                                        onChange={ (e) => {
                                            setHardinessZone(Number(e.target.value));
                                            }
                                        }
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option> 
                                        <option value="4">4</option>   
                                        <option value="5">5</option>   
                                        <option value="6">6</option>   
                                        <option value="7">7</option>   
                                        <option value="8">8</option>   
                                        <option value="9">9</option>   
                                        <option value="10">10</option>   
                                        <option value="11">11</option>   
                                        <option value="12">12</option>   
                                        <option value="13">13</option>
                                    </select>
                                </h5>
                            </>
                        ) : (
                            <h5>Hardiness Zone: { hardinessZone }<Button text="" classes="min-size min-style borders-right" icon={<i className="fas fa-edit"></i>} onClick={handleEditChangeHardinessZone} /></h5>
                        )}
                    </div>
                    <div className="account-weather-details">
                        {isEditingTemperatureUnit ? (
                            <>
                                <h5>
                                    Temperature Unit: 
                                    <select 
                                        value={ temperatureUnit } 
                                        onChange={ (e) => {
                                            if (e.target.value === 'F' || e.target.value === 'C') {
                                                setTemperatureUnit(e.target.value as 'F' | 'C')
                                            }
                                        } }

                                    >
                                        <option value="F" selected>Fahrenheit</option>
                                        <option value="C">Celsius</option>    
                                    </select>
                                </h5>
                            </>
                        ) : (
                            <h5>Temperature Unit: { temperatureUnit }<Button text="" classes="min-size min-style borders-right" icon={<i className="fas fa-edit"></i>} onClick={handleEditChangeTemperatureUnit} /></h5>
                        )}
                    </div>
                    {/* <Button onClick={ () => { handleAddNewAccountSettingsToServer(); } } text='Push New Account Settings (Use for no stored db settings)' /> */}
                    <Button onClick={ () => { handleSaveAccountSettingsToServer(); } } text='Save' />
                    <Button onClick={ () => { handleCancelEdits(); } } text='Cancel' />
                    {/* <Button onClick={ () => { handleDeleteAllUserSettings(); } } text='Delete all user settings' /> */}
                </div>
            </div>
        </>
    );
}

export default SettingsAccountInformation;