// https://www.missouribotanicalgarden.org/gardens-gardening/your-garden/help-for-the-home-gardener/advice-tips-resources/gardening-by-month
// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Gardening page of the HomeLife app.
import './css/dashboards/Explore.css'

import { Link, Outlet } from 'react-router-dom';

function Settings() {

    return (
        <div className='common-container settings-container'>
            <div className='settings-menu'>
                <h2>Settings</h2>
                <Link to='/settings/account-information'>
                    <span>Account Information</span>
                </Link>
                <Link to='/settings/preferences'>
                    <span>Preferences</span>
                </Link>
                <Link to='/settings/notifications'>
                    <span>Notifications</span>
                </Link>
                <Link to='/settings/security'>
                    <span>Security</span>
                </Link>
                <Link to='/settings/privacy'>
                    <span>Privacy</span>
                </Link>
                <Link to='/settings/help'>
                    <span>Help</span>
                </Link>
                <Link to='/settings/feedback'>
                    <span>Feedback</span>
                </Link>
            </div>
            <div className='vertical-ruler'></div>
            <div className='settings'>
                <Outlet />
            </div>
        </div>
    );
}

export default Settings;