import { useState } from 'react';
import { getCorrectDomain } from '../AppSettings';

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
        console.log("Fetched user preferences data: " + JSON.stringify(data[0][0]));
        const returnData: ReturnPropsAPIGetUserPreferences = {
            userPreferences: {
                id: data[0][0].id,
                userId: data[0][0].userId,
                preferences: JSON.parse(data[0][0].preferences)
            },
            isAPIDown: false
        }
        return returnData;
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


export interface ReturnPropsAPIGetUserLoginResponse {
    newNavigationRoute: string,
    errorMessage: string
}

export const APIGetUserLoginResponse = (userEmail: string, userPassword: string) => {
    let returnData: ReturnPropsAPIGetUserLoginResponse = {
        newNavigationRoute: '',
        errorMessage: ''
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
    }).then(function (response) {
        // TODO: Login user and store info into cookies
        if (response[0].result === "Success") {
            console.log("Result: ", JSON.stringify(response));
            let userData = response[0].data;
            // Store user info locally
            localStorage.setItem('user', JSON.stringify(userData));
            returnData = {
                newNavigationRoute: '/dashboard',
                errorMessage: ''
            }
            // Return data
            return returnData;
        } else {
            // TODO: Display message to user, error logging in.
            console.log("Result: ", JSON.stringify(response));
            returnData = {
                newNavigationRoute: '',
                errorMessage: response[0].message
            }
            // Return new navigation direction: none since we want to stay on the page
            return returnData;
        }
    }).catch(function (error) {
        console.warn('Something went wrong with api login request.', error);
        return returnData;
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
            reminder: (values.reminder == "false"),
            autopay: (values.autopay == "false"),
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
            reminder: (values.reminder == "false"), 
            autopay: (values.autopay == "false"),
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
        console.log("Fetched bill data: " + JSON.stringify(data[0]));
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
        console.log("Fetched bill data: " + JSON.stringify(data));
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