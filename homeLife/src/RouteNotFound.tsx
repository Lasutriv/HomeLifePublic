// Tanner Fry

import React, { useEffect } from 'react';
import { BackButton } from './components/elements/Button';
import { useNavigate } from 'react-router-dom';

function RouteNotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        
    }, []);

    return (
        <>
            <BackButton text="Back" onClick={() => { navigate(-1); }} style={{marginLeft: 15}} />
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'
            }}>Error 404: Page not found.</div>
        </>
    );
}


export default RouteNotFound;