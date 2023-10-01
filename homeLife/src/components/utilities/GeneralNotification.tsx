import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ExitButton } from "../elements/Button";

function GeneralNotification({title, text}) {
    const location = useLocation();
    const locationToShowAt = [
        '/',
        '/about',
        '/dashboard',
    ]
    const [show, setShow] = useState(false);

    

    useEffect(() => {
        // Start drop animation
        if (locationToShowAt.includes(location.pathname)) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [location]);

    return (
        <>
            {show && (
                <motion.div
                    initial={{ 
                        top: '7vh', 
                        opacity: 0,
                        right: '-15vw'
                    }}
                    animate={{ 
                        position: 'fixed',
                        opacity: 1,
                        right: 0,
                        top: '7vh', 
                    }}
                    transition={{ duration: 0.75, ease: "easeInOut" }}
                    style={{
                        zIndex: 9999,
                    }}
                    className="general-notification-container"
                >
                    <div className="general-notification">
                        <div className="header">
                            <h3>{title}</h3>
                            <ExitButton handleCallback={() => setShow(false)} />
                        </div>
                        <div className="text">
                            <p>{text}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </>    
    );
}

export default GeneralNotification;