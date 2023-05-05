import { useNavigate } from 'react-router-dom';
import { MenuButton } from './Button';
import React, { useEffect, useState } from 'react';
import { MenuAppColorPickers } from './MenuAppColorPickers';
import _settings from '../../AppSettings';
import { APIGetUserPreferences, ReturnPropsAPIGetUserPreferences } from '../../api/Common';

interface IMenuProps {
  	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LeftMenu = ({ isMenuOpen, setIsMenuOpen }: IMenuProps) => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// TODO: Load user database values for theme color
	const [menuThemeColor, setMenuThemeColor] = useState('');
	const [userPreferences, setUserPreferences] = useState({
		id: -1,
		userId: -1,
		preferences: {
			menuThemeColor: ''
		}
	});
	const [isAPIDown, setIsAPIDown] = useState(false);

	// Load user theme info on initial load and whenever user is logged in
	useEffect(() => {
		getUserPrefs();
	}, [isLoggedIn])

	// Update menu when user preferences is updated
	useEffect(() => {
		if (userPreferences.preferences.menuThemeColor != "") {
			setMenuThemeColor(userPreferences.preferences.menuThemeColor);
		}
	}, [userPreferences])

	async function getUserPrefs() {
		if (isLoggedIn) {			
			const apiData: ReturnPropsAPIGetUserPreferences = await APIGetUserPreferences();
			setUserPreferences({
				id: apiData.userPreferences.id,
				userId: apiData.userPreferences.userId,
				preferences: apiData.userPreferences.preferences
			});
			setIsAPIDown(apiData.isAPIDown);
		}
	}

	// Check if user is logged in. If not, redirect them
	useEffect(() => {
		const interval = setInterval(() => {			
			if ((typeof JSON.parse(localStorage.getItem('user'))?.id) == 'number') {
				// TODO: Verify user credentials match server. If not, remove the local credentials
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
				localStorage.removeItem('user');
				if (!(window.location.pathname == "/register")) {
					setIsMenuOpen(false);
					navigate('/login');
				}
			}
		}, 500);
		return () => {
			clearInterval(interval);
		};
    }, []);

	function handleLogin() {
		setIsMenuOpen(false);
		navigate('/login');
	}

	function handleLogout() {
		setIsMenuOpen(false);
		localStorage.removeItem('user');
		navigate('/login');
	}
	
	function handleCreateAccount() {
		setIsMenuOpen(false);
		navigate('/register');
	}

	function handleDashboard() {
		setIsMenuOpen(false);
		navigate('/dashboard');
	}
	function handleHome() {
		setIsMenuOpen(false);
		navigate('/');
	}

	return (
		<div className={`app-menu ${isMenuOpen ? "menu-open" : ""}`} style={{backgroundColor: menuThemeColor}}>
			<h2>Settings</h2>
			<MenuButton text="Home" onClick={handleHome} style={{backgroundColor: menuThemeColor}} />
			{isLoggedIn ? (
				<>
					<MenuButton 
						text="Dashboard" 
						onClick={handleDashboard}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuButton 
						text="Logout" 
						onClick={handleLogout}
						style={{backgroundColor: menuThemeColor}}
					/>
				</>
			) : (
				<MenuButton text="Login" onClick={handleLogin} style={{backgroundColor: menuThemeColor}} />
			)}
			<MenuButton text="Create Account" onClick={handleCreateAccount} style={{backgroundColor: menuThemeColor}} />
			<MenuAppColorPickers menuThemeColor={menuThemeColor.replace('rgb(', '').replace(')', '').split(',')} setMenuThemeColor={setMenuThemeColor}/>
		</div>
	);
};
