// Tanner Fry

import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { GlobalContext } from './AppSettings';
import { SubscriptionPlan } from './App';
import { useAppSelector } from './AppHooks';
import { APIGetGeoLocation, APIGetWeatherData } from './api/Common';

export interface IUserProps {
    id: number,
    email: string,
    firstName: string,
    lastName: string
}

export interface IUserSettings {
    id: number,
    userId: number,
    hardinessZone: number,
    location: string,
    temperatureUnit: string,
}

interface IDashboardProps {
    userPlan: SubscriptionPlan;
}

function Dashboard(props: IDashboardProps) {
    const currentUser: IUserProps = JSON.parse(localStorage.getItem('user'));
    const hardinessZone = useAppSelector(state => state.users.hardinessZone);
    const location = useAppSelector(state => state.users.location);
    const temperatureUnit = useAppSelector(state => state.users.temperatureUnit);
    const [weatherData, setWeatherData] = useState<any>([]);

    useEffect(() => {
        APIGetGeoLocation(location.split(',')[0].trim()).then((data) => {
            // console.log(data.response[0]);
            APIGetWeatherData(data.response[0].lat, data.response[0].lon).then((data) => {
                console.log("Setting weather data: ", data.response);
                setWeatherData(data.response);                
            });
        });
    }, []);


    return (
        <div className='user-dashboard-container'>
            <img src={require('./files/splashScreens/Wheat-Background.png')} />
            <div className='user-dashboard-content'>
                <div className='user-info'>
                    <div className='user-content'>
                        <div className='name'>
                            {currentUser.firstName} {currentUser.lastName} - Plan: {props.userPlan}
                        </div>
                        <hr/>
                        <div className='user-content-item'>
                            Hardiness Zone: {hardinessZone}
                            {/* Total Tasks Completed:  */}
                            {/* TODO: Pull from the statistics table */}
                            {/* {globalData.user.totalTasksCompleted !== "" ? (
                                globalData.user.totalTasksCompleted
                            ) : (
                                <> 0</>
                            )} */}
                        </div>
                        <div className='user-content-item'>Location: {location}</div>
                        <div className='user-content-item'>Current temp: {(temperatureUnit === 'F') ? weatherData?.current?.temp.toPrecision(2) : ((weatherData?.current?.temp - 32) * (5/9)).toPrecision(2)} °{temperatureUnit}</div>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;