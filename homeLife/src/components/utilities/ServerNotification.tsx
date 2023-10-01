import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ExitButton } from "../elements/Button";
import { APIGETServerNotification } from "../../api/Common";

interface IServerNotificationAPIResponse {
    response: string,
    message: {
        title: string,
        text: string
    }
}

function ServerNotification() {
    const location = useLocation();
    const locationToShowAt = [
        '/',
        '/about',
        '/dashboard',
    ]
    const [show, setShow] = useState(false);
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationText, setNotificationText] = useState('');

    useEffect(() => {
        // Get server notification via /notify endpoint
        const getServerNotification = async () => {
            const serverNotificationResponse: IServerNotificationAPIResponse = await APIGETServerNotification();
            // console.log('Server Notification: ', serverNotificationResponse.message);
            if (serverNotificationResponse != null) {
                setNotificationTitle(serverNotificationResponse.message.title);
                setNotificationText(serverNotificationResponse.message.text);
            }
        }

        getServerNotification();
    }, []);

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
            {show && notificationTitle !== "" && notificationText !== "" && (
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
                        zIndex: 98,
                    }}
                    className="general-notification-container"
                >
                    <div className="general-notification">
                        <div className="header">
                            <h3>{notificationTitle}</h3>
                            <ExitButton handleCallback={() => setShow(false)} />
                        </div>
                        <div className="text">
                            <p>{notificationText}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </>    
    );
}

export default ServerNotification;