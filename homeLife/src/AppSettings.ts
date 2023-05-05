// Tanner Fry
// tfry@thinkbox312.com
// App settings that are global.

// http://3.98.93.165:8080
// Localhost dev domain: https://www.npmjs.com/package/local-cors-proxy

import { createContext, useContext } from 'react';

export const _settings = {
    // API HOSTNAME should be <server_name> when deploying
    API_HOSTNAME: '<server_name>',
    API_DEV_HOSTNAME: 'http://localhost:7778',  // Use for knowing what host the API is on and pinging it correctly
    API_COMPUTER_PORT: '7778',
    API_CONTAINER_PORT: '7778',
    MYSQL_COMPUTER_PORT: '3308',
    MYSQL_CONTAINER_PORT: '3306',  // MySQL default port
    APP_COMPUTER_PORT: '7777',
    APP_CONTAINER_PORT: '3000',  // React default port
    ENVIRONMENT: 'dev',  // Can be dev or prod
    IS_CONSTANT_LOADING_ENABLED: false,  // Used for quick refreshes on app.
}

export const getCorrectDomain = () => {
    if (_settings.ENVIRONMENT === 'dev') {
        return _settings.API_DEV_HOSTNAME;
    } else {
        return _settings.API_HOSTNAME;
    }
}

// Context used to hold all global initiative data pulled by the user
export const GlobalContext = createContext({
    globalData: {
        user: {
            id: "",
            email: "",
            firstName: "",
            lastName: "",
            totalTasksCompleted: "",
        },
        userPreferences: {

        },
        formStates: {}
    },
    setGlobalData: (value) => {return value}
});

export default _settings;