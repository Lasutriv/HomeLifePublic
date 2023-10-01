import { useEffect, useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import { LeftMenu } from "./LeftMenu";
import { ReactDimmer } from "react-dimmer";
import PropTypes from "prop-types";
import { Button } from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { _settings_customer } from "../../AppSettings";
import { useAppDispatch, useAppSelector } from "../../AppHooks";
import { setLastLocation, setLastLocationUnauthenticated } from "../../slices/UserSlice";
import GeneralNotification from "../utilities/GeneralNotification";
import ServerNotification from "../utilities/ServerNotification";
import ReleaseCounter from "../utilities/ReleaseCounter";

// interface IUserInfoProps {
//     id: number,
//     email: string,
//     firstName: string,
//     lastName: string
// }

function Header({title}) {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [isMenuOpen, setMenu] = useState(false);
    const [noticeBanner, setNoticeBanner] = useState('');
    const navigate = useNavigate();
    let location = useLocation();
    const isAuthenticated = useAppSelector(state => state.users.isLoggedIn);
    const dispatch = useAppDispatch();

    const handleMenu = () => {
        setMenu((prevState) => !prevState);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Check which page we're on and set the notice accordingly
    useEffect(() => {
        // Use array at _settings_customer.NOTICE_BANNERs to get correct notice based on page location. Then assign to noticeBanner
        const page = window.location.pathname;
        const notice = _settings_customer.NOTICE_BANNERS.filter((item) => item.location === page);
        setNoticeBanner(notice[0]?.title ? notice[0].title : '');

        // Set last location while logged in, in redux
        if (isAuthenticated) {
            // Take user to last location if it doesn't match the current location
            dispatch(setLastLocation(location.pathname));
        } else {
            // Set unauthenticated last location
            dispatch(setLastLocationUnauthenticated(location.pathname));
        }
    }, [location]);

    return (
        <>
            <header className="app-header">
                <div className="menu-hamburger">
                    <GiHamburgerMenu onClick={handleMenu} />
                    <Button 
                        classes="app-header-back-button" 
                        onClick={() => { navigate(-1) }}
                        text="Back"
                    />
                </div>
                <ReleaseCounter numberHeight={5} /> 
                <h1>{title}</h1>
                <div className="app-time">
                    {new Date().toLocaleDateString() + ' ' + currentTime.slice(0, -6) + ' ' + currentTime.slice(-2)}
                </div>
                <div className="app-notice-banner">
                    <div className="app-notice-banner-text">
                        <div className="app-notice-banner-text-body">
                            {noticeBanner && (
                                <><span style={{color: 'red'}}>Notice: </span>{noticeBanner}</>
                            )}
                        </div>
                    </div>
                </div>
                <ServerNotification />
            </header>
            <LeftMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setMenu} />
            <ReactDimmer
                isOpen={isMenuOpen}
                exitDimmer={setMenu}
                zIndex={99}
            />
        </>
    );
}

Header.defaultProps = {
    title: "MyHomeLife"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;