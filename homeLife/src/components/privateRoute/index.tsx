// Tanner Fry
// Private route component is used to perform user validation to make sure they are logged into before showing the
// components children. For example usage, see src/App.js.

import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../AppHooks";
import { setLoggedIn } from "../../slices/UserSlice";
import { _settings_non_private_routes } from "../../AppSettings";

function PrivateRoute({ children }) {
    let userData = JSON.parse(localStorage.getItem('user'));
    let location = useLocation();
    const isAuthenticated = useAppSelector(state => state.users.isLoggedIn);
    const lastLocation = useAppSelector(state => state.users.lastLocation);
    const dispatch = useAppDispatch();

    // Set aithentication status on initial load
    useEffect(() => {
        userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            // TODO: Enhance authentication.
            // Get user token from local data and send it to server. Server will verify aliveness and validate token.
            dispatch(setLoggedIn(true));
            console.log("User is authenticated. Store status.");
        }
    }, []);

    // Set aithentication status on location change
    useEffect(() => {
        userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            // TODO: Enhance authentication.
            // Get user token from local data and send it to server. Server will verify aliveness and validate token.
            dispatch(setLoggedIn(true));
            console.log("User is authenticated. Store status.");
        }
    }, [location]);

    // Check if user is logged in.
    // TODO: Enhance authentication
    return isAuthenticated ? (
        children
    ) : (
        <>
            {JSON.parse(localStorage.getItem('user')) !== null && JSON.parse(localStorage.getItem('user')) !== undefined ? (
                children
            ) : (
                <Navigate to="/login" />
            )}
        </>
    )
}

export default PrivateRoute;