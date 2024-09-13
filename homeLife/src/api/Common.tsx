import { getCorrectDomain } from '../AppSettings';
import { SubscriptionPlan } from '../App';
import { AppFeatureType } from '../components/privateRoute/SecurityClearance';

export interface IUserFromUsersList {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
}

export interface ReturnPropsAPIGetUsers {
    users: IUserFromUsersList[],
    isAPIDown: boolean
}

export const APIGetUsers = () => {
    return fetch(getCorrectDomain() + '/api/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched user list data: " + JSON.stringify(data[0]));
        const userData = [];
        userData.push(data[0]);
        const returnData: ReturnPropsAPIGetUsers = {
            users: data[0].map((user) => { return user; }),
            isAPIDown: false
        }
        return returnData;
    }).catch(function (error) {
        console.log("API user list fetch error: '" + JSON.stringify(error) + "'.");
        console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
        if (error === "TypeError: Failed to fetch") {
            const returnData: ReturnPropsAPIGetUsers = {
                users: [],
                isAPIDown: true
            }
            return returnData;
        }
    });
}

export interface ReturnPropsAPIGetUserPreferences {
    userPreferences: {
        id: number,
        userId: number,
        preferences: {
            menuThemeColor: string
        }
    },
    isAPIDown: boolean
}

// Function to get user preferences from the database. Even though we're
// wanting to get data, we perform a post with user credentials since we want
// to push user id data for verification. Not the best way to do it as we should
// implement an authentication service that each request goes through first, but
// this is fine for now.
export const APIGetUserPreferences = () => {
    return fetch(getCorrectDomain() + '/api/userpreferences', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched user preferences data: ", data[0][0]);
        if (data[0][0] === undefined) {
            const returnData: ReturnPropsAPIGetUserPreferences = {
                userPreferences: null,
                isAPIDown: false
            }
            return returnData;
        } else {
            const returnData: ReturnPropsAPIGetUserPreferences = {
                userPreferences: {
                    id: data[0][0].id,
                    userId: data[0][0].userId,
                    preferences: JSON.parse(data[0][0].preferences)
                },
                isAPIDown: false
            }
            return returnData;
        }
    }).catch(function (error) {
        console.log("API user preferences fetch error: '" + JSON.stringify(error) + "'.");
        console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
        if (error === "TypeError: Failed to fetch") {
            const returnData: ReturnPropsAPIGetUserPreferences = {
                userPreferences: null,
                isAPIDown: true
            }
            return returnData;
        }
    });
}

export interface ReturnPropsAPIGetUserGarden {
    userGarden: {
        id: number,
        userId: number,
        name: string,
        description: string,
        imageRef: string,
    }[],
    isAPIDown: boolean
}

// Function to get user preferences from the database. Even though we're
// wanting to get data, we perform a post with user credentials since we want
// to push user id data for verification. Not the best way to do it as we should
// implement an authentication service that each request goes through first, but
// this is fine for now.
export const APIGetUserGarden = () => {
    return fetch(getCorrectDomain() + '/api/usergardens', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        // console.log("Fetched user garden data: ", data[0].response);
        if (data[0].response === undefined) {
            const returnData: ReturnPropsAPIGetUserGarden = {
                userGarden: null,
                isAPIDown: false
            }
            return returnData;
        } else {
            const returnData: ReturnPropsAPIGetUserGarden = {
                userGarden: data[0].response.map((garden) => { return garden; }),
                isAPIDown: false
            }
            // TODO: Get image data for each garden

            return returnData;
        }
    }).catch(function (error) {
        console.log("API user gardens fetch error: '" + JSON.stringify(error) + "'.");
        console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
        if (error === "TypeError: Failed to fetch") {
            const returnData: ReturnPropsAPIGetUserGarden = {
                userGarden: null,
                isAPIDown: true
            }
            return returnData;
        }
    });
}

export const APIDeleteUserGarden = (gardenId) => {
    return fetch(getCorrectDomain() + '/api/usergardens/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            gardenId: gardenId
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched user garden delete data: ", data[0].response);
        if (data[0].response === undefined) {
            return {
                status: 406,
            };
        } else {
            return {
                status: 200,
            };
        }
    }).catch(function (error) {
        console.log("API user gardens fetch error: '" + JSON.stringify(error) + "'.");
        console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
        if (error === "TypeError: Failed to fetch") {
            return {
                status: 500,
            };
        }
    });
}

export const APIGetImageUserGarden = (imageRef) => {
    // /api/usergardens/images
    return fetch(getCorrectDomain() + '/api/usergardens/update/garden', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            imageRef: imageRef,
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched user garden image data: ", data[0].response);
        if (data[0].response === undefined) {
            return {
                status: 406,
            };
        } else {
            return {
                status: 200,
            };
        }
    }).catch(function (error) {
        console.log("API user gardens image fetch error: '" + JSON.stringify(error) + "'.");
        console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
        if (error === "TypeError: Failed to fetch") {
            return {
                status: 500,
            };
        }
    });
};

export const APIPostImageUserGarden = (gardenId, gardenName, description, imageRef, image) => {
    console.log("Posting image via API POST request.");
    
    return fetch(getCorrectDomain() + '/api/usergardens/update/garden', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            gardenId: gardenId,
            name: gardenName,
            description: description,
            imageRef: imageRef,
            image: image
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched user garden post image data: ", data[0].response);
        if (data[0].response === undefined) {
            return {
                status: 406,
            };
        } else {
            return {
                status: 200,
            };
        }
    }).catch(function (error) {
        console.log("API user gardens fetch error: '" + JSON.stringify(error) + "'.");
        console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
        if (error === "TypeError: Failed to fetch") {
            return {
                status: 500,
            };
        }
    });
}

export interface ReturnPropsAPIGetUserSubscriptionPlanResponse {
    subscriberPlan: SubscriptionPlan,
    errorMessage: string
}

export const APIGetUserSubscriptionPlanResponse = async (userEmail: string) => {
    let returnUserPlan: ReturnPropsAPIGetUserSubscriptionPlanResponse = {
        subscriberPlan: SubscriptionPlan.Free,
        errorMessage: ''
    }
    
    return fetch(getCorrectDomain() + '/api/users/is-subscriber', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
        })
    }).then(function (response) {
        if (response.ok) {                    
            return response.json();
        }
        return Promise.reject(response);
    }).then(async function (response) {                
        if (response[0].result === "Success") {
            returnUserPlan = {
                subscriberPlan: response[0].data.plan,
                errorMessage: ''
            };
            return returnUserPlan;
        } else {
            // TODO: Display message to user, error getting subscription plan.
            console.log("Subscriber Result: ", JSON.stringify(response));
            console.log("Subscriber email: ", userEmail);
            
            returnUserPlan = {
                subscriberPlan: SubscriptionPlan.Free,
                errorMessage: response[0].message
            };
            return returnUserPlan;
        }
    }).catch(function (error) {
        console.warn('Something went wrong with api subscriber check.', error);
        returnUserPlan = {
            subscriberPlan: SubscriptionPlan.Free,
            errorMessage: error
        };
        return returnUserPlan;
    });
};

export interface ReturnPropsAPIGetUserLoginResponse {
    newNavigationRoute: string,
    isSubscriber: boolean,
    subscriberPlan: SubscriptionPlan,
    error: string
}

export const APIGetUserLoginResponse = (userEmail: string, userPassword: string) => {
    let returnLoginData: ReturnPropsAPIGetUserLoginResponse = {
        newNavigationRoute: '',
        isSubscriber: false,
        subscriberPlan: SubscriptionPlan.Free,
        error: ''
    }

    return fetch(getCorrectDomain() + '/api/users/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
            passHash: userPassword
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(async function (response) {
        // TODO: Login user and store info into cookies
        if (response[0].result === "Success") {
            console.log("General Result: ", JSON.stringify(response));
            let userData = response[0].data;
            console.log("User data from server: ", JSON.stringify(userData));
            
            // Store user info locally
            localStorage.setItem('user', JSON.stringify(userData));
            returnLoginData = {
                newNavigationRoute: '/dashboard',
                isSubscriber: false,
                subscriberPlan: SubscriptionPlan.Free,
                error: ''
            }

            console.log("User return data: ", returnLoginData);
            
            // TODO: Check if user has paid for a plan on Stripe. If so, set user's plan to paid
            // TODO: Make a request to our server which will then use the Stripe API to check if the user has a plan,
            //       essentially, via the steps below 
            // https://stripe.com/docs/api/charges/object?lang=node
            returnLoginData.isSubscriber = await fetch(getCorrectDomain() + '/api/users/is-subscriber', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                })
            }).then(function (response) {
                if (response.ok) {                    
                    return response.json();
                }
                return Promise.reject(response);
            }).then(async function (response) {                
                if (response[0].result === "Success") {
                    returnLoginData.subscriberPlan = response[0].data.plan;
                    return true;
                } else {
                    // TODO: Display message to user, error logging in.
                    console.log("Subscriber Result: ", JSON.stringify(response));
                    // Return new navigation direction: none since we want to stay on the page
                    return false;
                }
            }).catch(function (error) {
                console.warn('Something went wrong with api subscriber check.', error);
                return false;
            });

            // Return data
            return returnLoginData;
        } else {
            // TODO: Display message to user, error logging in.
            console.log("Error Results: ", JSON.stringify(response));
            returnLoginData = {
                newNavigationRoute: '',
                isSubscriber: false,
                subscriberPlan: SubscriptionPlan.Free,
                error: response[0].message
            }
            // Return new navigation direction: none since we want to stay on the page
            return returnLoginData;
        }
    }).catch(function (error) {
        console.warn('Something went wrong with api login request.', error);
        return returnLoginData;
    });
}

export const APIGetUserSettings = () => {
    return fetch(getCorrectDomain() + '/api/users/settings', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
        })
    }).then(function (response) {        
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched user settings data: " + JSON.stringify(data[0]));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIPostNewUserSettings = (hardinessZone, temperatureUnit, weatherLocation) => {
    return fetch(getCorrectDomain() + '/api/users/settings/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            hardinessZone: hardinessZone,
            temperatureUnit: temperatureUnit,
            location: weatherLocation
        })
    }).then(function (response) {        
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Pushed new user settings data: " + JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            hardinessZone: hardinessZone,
            temperatureUnit: temperatureUnit,
            location: weatherLocation
        }));
        console.log("Fetched new user settings data: " + JSON.stringify(data[0]));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

// interface IAddUserSettings {
//     userId: number,
//     hardinessZone: number,
//     temperatureUnit: string,
//     location: string
// }
export const APIPostAddUserSettings = (hardinessZone: number, temperatureUnit: string, weatherLocation: string) => {
    return fetch(getCorrectDomain() + '/api/users/settings/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            hardinessZone: hardinessZone,
            temperatureUnit: temperatureUnit,
            location: weatherLocation
        })
    }).then(function (response) {        
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Pushed new user settings data: " + JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            hardinessZone: hardinessZone,
            temperatureUnit: temperatureUnit,
            location: weatherLocation
        }));
        console.log("Fetched new user settings data: " + JSON.stringify(data));
        return data;
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIPostUpdateUserSettings = (hardinessZone, temperatureUnit, weatherLocation) => {
    return fetch(getCorrectDomain() + '/api/users/settings/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            hardinessZone: hardinessZone,
            temperatureUnit: temperatureUnit,
            location: weatherLocation
        })
    }).then(function (response) {        
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Pushed new user settings data: " + JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            hardinessZone: hardinessZone,
            temperatureUnit: temperatureUnit,
            location: weatherLocation
        }));
        
        console.log("Fetched new user settings data: " + JSON.stringify(data[0]));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIGetDeleteAllUserSettings = () => {
    return fetch(getCorrectDomain() + '/api/users/settings/delete-all', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (response) {        
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched delete all user settings data: " + JSON.stringify(data[0]));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIPostNewBill = (values) => {
    return fetch(getCorrectDomain() + '/api/bills/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            title: values.billName,
            description: values.description,
            amount: values.amount,
            reminder: (values.reminder === "false"),
            autopay: (values.autopay === "false"),
            dueDate: JSON.stringify(values.dueDate).replaceAll('"', ''),
            reminderDueDate0: values['dueDate-0'],
            reminderDueDate1: values['dueDate-1'],
            reminderDueDate2: values['dueDate-2'],
            reminderDueTime0: values['dueTime-0'],
            reminderDueTime1: values['dueTime-1'],
            reminderDueTime2: values['dueTime-2'],
        })
    }).then(function (response) {
        console.log("Client bill add request body: ", JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            title: values.billName,
            description: values.description,
            amount: values.amount,
            reminder: (values.reminder === "false"), 
            autopay: (values.autopay === "false"),
            dueDate: JSON.stringify(values.dueDate).replaceAll('"', ''),
            reminderDueDate0: values['dueDate-0'],
            reminderDueDate1: values['dueDate-1'],
            reminderDueDate2: values['dueDate-2'],
            reminderDueTime0: values['dueTime-0'],
            reminderDueTime1: values['dueTime-1'],
            reminderDueTime2: values['dueTime-2'],
        }));
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log(data);
        return data;
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIGetBills = () => {
    return fetch(getCorrectDomain() + '/api/bills', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (response) {        
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        // console.log("Fetched bill data: " + JSON.stringify(data[0]));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIGetBillsByUser = (userId) => {    
    return fetch(getCorrectDomain() + '/api/bills', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        // console.log("Fetched bill data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.log("API Bills fetch error: '" + JSON.stringify(error) + "'.");
        console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
        return false;
    });
}

export const APIPostNewSharedBill = ({billId, shareBill, userIdA, userIdB}) => {
    return fetch(getCorrectDomain() + '/api/sharedbills/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            billId: billId,
            isShared: shareBill,
            userIdA: userIdA,
            userIdB: userIdB
        })
    }).then(function (response) {
        console.log("Client shared bill add request body: ", JSON.stringify({
            billId: billId,
            isShared: shareBill,
            userIdA: userIdA,
            userIdB: userIdB
        }));
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export interface ISharedBillProps {
	id: number,
    isShared: number,
    billId: number,
    userIdA: number,
    userIdB: number
}

export const APIGetSharedBills = () => {
    return fetch(getCorrectDomain() + '/api/sharedbills', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (response) {        
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched shared bill data: " + JSON.stringify(data[0]));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIGetNewsLatest = (searchTerm?: string) => {
    const searchAddon = (searchTerm !== ''  && searchTerm !== undefined) ? ('&q=' + searchTerm) : '';
    const languageAddon = '&language=en';
    console.log("Request URL for news: ", 'https://newsdata.io/api/1/news?apikey=' + process.env.REACT_APP_TEST_NEWS_DATA_KEY + searchAddon + languageAddon);
    // TODO: Add user's language setting to the request
    
    return fetch(getCorrectDomain() + '/api/news/latest', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            searchAddon: searchAddon,
            languageAddon: languageAddon
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched news data: " + JSON.stringify(data));
        return data;
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
};

// Function to get geocoding data from the OpenWeatherMap API for a given location string.
// Note: You can pass just city names or city, state, country: {city name},{state code},{country code}.
// See: https://openweathermap.org/api/geocoding-api
// NOTE: I started implemented the weather API calls on our server instead of directly from the client. This should be more secure,  
//       prevent our API keys from being exposed, allow us to add more functionality to the API calls, allow us to cache data, and 
//       allow us to bypass CORS.
export const APIGetGeoLocation = (locationString, limit=1) => {
    return fetch(getCorrectDomain() + '/api/weather/geo', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            locationString: locationString,
            limit: limit
        })
    }).then(function (response) {        
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        // console.log("Fetched geocoding data for " + locationString + " : " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

// Function to get weather data from the OpenWeatherMap API for a given lat/long.
// NOTE: I started implemented the weather API calls on our server instead of directly from the client. This should be more secure,  
//       prevent our API keys from being exposed, allow us to add more functionality to the API calls, allow us to cache data, and 
//       allow us to bypass CORS.
export const APIGetWeatherData = (lat, lon) => {
    return fetch(getCorrectDomain() + '/api/weather', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lat: lat,
            lon: lon
        })
    }).then(function (response) {        
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        // console.log("Fetched weather data for (" + lat + ", " + lon + "): " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
// Tell server to update images from OMW API
export const APIGetWeatherRadarData = (layer, z, y, x) => {
    return fetch(getCorrectDomain() + '/api/weather/radar/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            layer: layer,
            z: z,
            y: y,
            x: x
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIGetWeatherRadarData response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        // console.log("Fetched weather data for (" + lat + ", " + lon + "): " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
// Tell server to update images from OMW API
export const APIGetNotes = () => {
    return fetch(getCorrectDomain() + '/api/notes', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIGetNotes response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
export const APIGetNotesByUser = (userId) => {
    return fetch(getCorrectDomain() + '/api/notes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIGetNotesByUser response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
export const APIPOSTNewNote = (userId, pageId, title, link, description, pubDate, encrypted, x, y, z) => {
    return fetch(getCorrectDomain() + '/api/notes/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            pageId: pageId,
            title: title,
            link: link,
            description: description,
            pubDate: pubDate,
            encrypted: encrypted,
            x: x,
            y: y,
            z: z
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTNewNote response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
export const APIPOSTUpdateNote = (id, userId, pageId, title, link, description, pubDate, encrypted, x, y, z) => {
    return fetch(getCorrectDomain() + '/api/notes/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            userId: userId,
            pageId: pageId,
            title: title,
            link: link,
            description: description,
            pubDate: pubDate,
            encrypted: encrypted,
            x: x,
            y: y,
            z: z
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTUpdateNote response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
export const APIPOSTDeleteNote = (id, userId, pageId) => {
    return fetch(getCorrectDomain() + '/api/notes/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            userId: userId,
            pageId: pageId,
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTDeleteNote response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIGetNotesPages = () => {
    return fetch(getCorrectDomain() + '/api/notes/pages', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIGetNotesPages response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
export const APIGetNotesPagesByUser = (userId) => {
    return fetch(getCorrectDomain() + '/api/notes/pages', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIGetNotesPagesByUser response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
export const APIPOSTNewNotePage = (userId, title) => {
    return fetch(getCorrectDomain() + '/api/notes/pages/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            title: title,
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTNewNotePage response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
export const APIPOSTUpdateNotePage = (id, userId) => {
    return fetch(getCorrectDomain() + '/api/notes/pages/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            userId: userId
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTUpdateNotePage response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
export const APIPOSTDeleteNotePage = (id, userId, pageId) => {
    return fetch(getCorrectDomain() + '/api/notes/pages/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            userId: userId,
            pageId: pageId,
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTDeleteNotePage response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}


// api/users/admin/add
export const APIPOSTAddAdmin = (userId, email, password) => {
    return fetch(getCorrectDomain() + '/api/users/admin/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            email: email,
            passHash: password,
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTAddAdmin response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched new admin data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIGETAllAnimals = () => {
    return fetch(getCorrectDomain() + '/api/animals', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIGETUserAnimals response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched user animals data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIGETUserAnimals = () => {
    return fetch(getCorrectDomain() + '/api/animals', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIGETUserAnimals response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched user animals data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIPOSTNewAnimal = (userId, animalName, animalType, animalBreed, animalSex, animalAge, animalWeight, animalImageRef, animalPrescriptions, animalSurgeries, animalVaccinations, animalNotes) => {
    return fetch(getCorrectDomain() + '/api/animals/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            name: animalName,
            type: animalType.value,
            breed: animalBreed,
            sex: animalSex.value,
            age: animalAge,
            weight: animalWeight,
            imageRef: animalImageRef,
            prescriptions: animalPrescriptions,
            surgeries: animalSurgeries,
            vaccinations: animalVaccinations,
            notes: animalNotes
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTNewAnimal response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched new animal data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIPOSTDeleteAnimal = (userId, animalId) => {
    return fetch(getCorrectDomain() + '/api/animals/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            id: animalId
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTDeleteAnimal response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched animal delete data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}


export const APIGETAnimalMeters = (animalId) => {
    return fetch(getCorrectDomain() + '/api/animals/meters', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            animalId: animalId
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIGETAnimalMeters response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIPOSTNewAnimalMeter = (animalId, animalMeterType, animalMeterValue, animalMeterTotal) => {
    return fetch(getCorrectDomain() + '/api/animals/meters/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            animalId: animalId,
            type: animalMeterType,
            value: animalMeterValue,
            total: animalMeterTotal
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTNewAnimalMeter response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched notes data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIPOSTDeleteAnimalMeter = (meterId, animalId) => {
    return fetch(getCorrectDomain() + '/api/animals/meters/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: meterId,
            animalId: animalId,
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTDeleteAnimal response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched animal delete data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

// TODO: Add update and delete for animal meters


// Feedback
export const APIGETFeedbackByUserId = (userId) => {
    return fetch(getCorrectDomain() + '/api/feedback', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTFeedback response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched feedback data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}
export const APIPOSTFeedback = (feedback, date) => {
    return fetch(getCorrectDomain() + '/api/feedback/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            feedback: feedback,
            date: date
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTFeedback response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched feedback data: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

// api/users/admin/add
export const APIGETServerNotification = () => {
    return fetch(getCorrectDomain() + '/api/notify', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (response) {        
        if (response.ok) {
            // console.log("APIGETServerNotification response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        // console.log("Fetched new server notification: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

// api/subscriptions/feature/auth
export const APIPOSTSubscriptionsFeatureAuth = (userId, feature: string, subFeature: string) => {
    return fetch(getCorrectDomain() + '/api/subscriptions/feature/auth', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            feature: feature,
            subFeature: subFeature
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIGETSubscriptionsFeatureAuth response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched new server feature auth: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

const sqlCookingRecipesTableQuery = "CREATE TABLE IF NOT EXISTS cookingrecipes ("
                                            + "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, "
                                            + "userId INT NOT NULL, "
                                            + "name VARCHAR(255) NOT NULL, "
                                            + "description VARCHAR(255) NOT NULL, "
                                            + "imageRef VARCHAR(255) NOT NULL, "
                                            + "ingredients VARCHAR(255) NOT NULL, "
                                            + "steps VARCHAR(255) NOT NULL "
                                            + ");";
// api/cooking/recipes/add
export const APIPOSTCookingRecipe = (userId, name, description, imageRef, ingredients, steps) => {
    console.log("APIPOSTCookingRecipe: ", userId, name, description, imageRef, ingredients, steps);
    
    return fetch(getCorrectDomain() + '/api/cooking/recipes/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            name: name,
            description: description,
            imageRef: imageRef,
            ingredients: ingredients,
            steps: steps
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTCookingRecipe response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched new cooking recipe: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

export const APIPOSTCookingRecipeFavorite = (userId, recipeId) => {
    return fetch(getCorrectDomain() + '/api/cooking/recipes/favorite', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            recipeId: recipeId
        })
    }).then(function (response) {        
        if (response.ok) {
            console.log("APIPOSTCookingRecipeFavorite response: ", response);
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("Fetched new cooking recipe favorite: " + JSON.stringify(data));
        return data[0];
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}