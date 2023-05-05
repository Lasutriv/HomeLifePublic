// Tanner Fry
// Private route component is used to perform user validation to make sure they are logged into before showing the
// components children. For example usage, see src/App.js.

import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const userData = JSON.parse(localStorage.getItem('user'));

    // Check if user is logged in.
    // TODO: Enhance authentication
    return userData ? children : <Navigate to='/login' />
}

export default PrivateRoute;