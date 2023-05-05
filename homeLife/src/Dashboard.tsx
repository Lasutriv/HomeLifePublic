// Tanner Fry

import React, { useContext, useMemo, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { GlobalContext } from './AppSettings';

interface IUserProps {
    id,
    email,
    firstName,
    lastName,
    totalTasksCompleted
}

function Dashboard() {
    // const { globalData, setGlobalData } = useContext(GlobalContext)
    // const [ aGlobalData, aSetGlobalData ] = useState({});
    const [globalData, setGlobalData] = useState({
        user: {
            id: "",
            email: "",
            firstName: "",
            lastName: "",
            totalTasksCompleted: "",
        },
        userPreferences: {

        },
        formStates: {
            
        }
    })
    

    // Set initial global data
    useEffect(() => {
        let currentUser: IUserProps = JSON.parse(localStorage.getItem('user'));
        // console.log("A Global Data: ", JSON.stringify(aGlobalData));
        setGlobalData({
            user: {
                id: currentUser.id,
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                // totalTasksCompleted: currentUser.totalTasksCompleted,
                totalTasksCompleted: "",
            },
            userPreferences: {

            },
            formStates: {

            }
        });

        // eslint-disable-next-line
    }, [])

    return (
        <div className='user-dashboard-container'>
            <div className='user-dashboard-content'>
                <div className='user-info'>
                    <div className='user-content'>
                        <div className='name'>
                            {globalData.user.firstName} {globalData.user.lastName}
                        </div>
                        <hr/>
                        <div className='total-tasks-completed'>
                            Total Tasks Completed: 
                            {globalData.user.totalTasksCompleted != "" ? (
                                globalData.user.totalTasksCompleted
                            ) : (
                                <> 0</>
                            )}
                        </div>
                    </div>
                </div>
                <GlobalContext.Provider value={ {globalData, setGlobalData} }>
                    <Outlet />
                </GlobalContext.Provider>
            </div>
        </div>
    );
}

export default Dashboard;