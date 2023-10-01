import { useNavigate } from 'react-router-dom';
import { MenuButton } from './Button';
import React, { useEffect, useState } from 'react';
import { MenuAppColorPickers } from './MenuAppColorPickers';
import { _settings_customer, _settings_non_private_routes } from '../../AppSettings';
import { APIGetUserPreferences, APIGetUserSettings, ReturnPropsAPIGetUserPreferences } from '../../api/Common';
import { useIdleTimer } from "react-idle-timer";
import { useAppDispatch, useAppSelector } from '../../AppHooks';
import { setHardinessZone, setLocation, setLoggedIn, setTemperatureUnit } from '../../slices/UserSlice';
import { IUserSettings } from '../../Dashboard';

interface IMenuProps {
  	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LeftMenu = ({ isMenuOpen, setIsMenuOpen }: IMenuProps) => {
	const navigate = useNavigate();
	// Load user database values for theme color
	const [menuThemeColor, setMenuThemeColor] = useState('');
	const [userPreferences, setUserPreferences] = useState({
		id: -1,
		userId: -1,
		preferences: {
			menuThemeColor: ''
		}
	});
	const [isAPID, setIsAPIDown] = useState(false);
	const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
	const dispatch = useAppDispatch();

	// Load user theme info on initial load and whenever user is logged in
	useEffect(() => {
		getUserPrefs();
	}, [])

	useEffect(() => {
		getUserPrefs();
		console.log('Is API Down: ', isAPID);
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn])

	// Update menu when user preferences is updated
	useEffect(() => {
		if (userPreferences != null && userPreferences.preferences.menuThemeColor !== "") {
			setMenuThemeColor(userPreferences.preferences.menuThemeColor);
		}
	}, [userPreferences])

	async function getUserPrefs() {
		if (isLoggedIn) {						
			const apiData: ReturnPropsAPIGetUserPreferences = await APIGetUserPreferences();
			setIsAPIDown(apiData.isAPIDown);

			if (apiData.userPreferences !== null) {
				setUserPreferences({
					id: apiData.userPreferences.id,
					userId: apiData.userPreferences.userId,
					preferences: apiData.userPreferences.preferences
				});
			}

			// Store user settings into redux
			let userSettingsResponse = await APIGetUserSettings();
			let userSettings: IUserSettings = userSettingsResponse.response[0];			

			dispatch(setHardinessZone(userSettings.hardinessZone));
			dispatch(setLocation(userSettings.location));
			dispatch(setTemperatureUnit(userSettings.temperatureUnit));
		}		
	}

	// Idle timer
    const [idleState, setIdleState] = useState<string>('Active');
    const [idleCounter, setIdleCounter] = useState<number>(0);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const onIdle = () => { 
        setIdleState('Idle');
		handleLogout();
    };
    const onActive = () => { setIdleState('Active'); };
    const onAction = (prevState) => { setIdleCounter(prevState + 1); };

    const { getRemainingTime } = useIdleTimer({
        onIdle,
        onActive,
        onAction,
        timeout: 900000,  // 60 seconds * 15 minutes * 1000 milliseconds = 300000 milliseconds
        throttle: 500
    })
    
    useEffect(() => {
        const interval = setInterval(() => {
        setRemainingTime(Math.ceil(getRemainingTime() / 1000))
        }, 500)
    
        return () => {
        clearInterval(interval)
        }
    }, [])
    // End idle timer

	const checkIfLoggedIn = () => {
		if ((typeof JSON.parse(localStorage.getItem('user'))?.id) == 'number') {
			// TODO: Verify user credentials match server. If not, remove the local credentials
			dispatch(setLoggedIn(true));
			if (window.location.pathname === '/login' || window.location.pathname === '/register') {
				navigate('/');
			}			
		} else {
			dispatch(setLoggedIn(false));
			localStorage.removeItem('user');
			console.log("User is not logged in.");
			// Check if current route is in _settings_non_private_routes. If not, redirect to login
			if (!_settings_non_private_routes.includes(window.location.pathname)) {
				navigate('/login');
			}
		}
	}

	// Check once on initial load if user is logged in. If not, redirect them
	useEffect(() => {
		checkIfLoggedIn();
	}, []);

	// Periodically check if user is logged in. If not, redirect them
	useEffect(() => {
		const interval = setInterval(() => {			
			checkIfLoggedIn();
		}, 300000);  // 5 * 60 * 1000 = 300000 milliseconds = 5 minutes
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
		dispatch(setLoggedIn(false));
		navigate('/login');
	}

	function handleSettings() {
		setIsMenuOpen(false);
		navigate('/settings');
	}
	
	function handleCreateAccount() {
		setIsMenuOpen(false);
		navigate('/register');
	}

	function handleBilling() {
		setIsMenuOpen(false);
		window.location.href = _settings_customer.TEST_BILLING_URL;
	}

	function handleAnimals() {
		setIsMenuOpen(false);
		navigate('/animals');
	}

	function handleCooking() {
		setIsMenuOpen(false);
		navigate('/cooking');
	}

	function handleGardening() {
		setIsMenuOpen(false);
		navigate('/gardening');
	}

	function handleExplore() {
		setIsMenuOpen(false);
		navigate('/explore');
	}

	function handleMaintenance() {
		setIsMenuOpen(false);
		navigate('/maintenance');
	}

	function handleNews() {
		setIsMenuOpen(false);
		navigate('/news');
	}

	function handleNotes() {
		setIsMenuOpen(false);
		navigate('/notes');
	}


	function handleWeather() {
		setIsMenuOpen(false);
		navigate('/weather');
	}

	function handleDashboard() {
		setIsMenuOpen(false);
		navigate('/dashboard');
	}

	function handlePricing() {
		setIsMenuOpen(false);
		navigate('/pricing');
	}

	function handleQuestionsAndAnswers() {
		setIsMenuOpen(false);
		navigate('/q&a');
	}

	function handleHome() {
		setIsMenuOpen(false);
		navigate('/');
	}

	return (
		<div className={`app-menu ${isMenuOpen ? "menu-open" : ""}`} style={{backgroundColor: menuThemeColor}}>
			<h2>Menu</h2>
			<MenuButton text="Home" onClick={handleHome} style={{backgroundColor: menuThemeColor}} icon={<i className="fas fa-home"></i>} />
			{isLoggedIn ? (
				<>
					<div className="menu-divider" />
					<MenuButton 
						text="Explore" 
						onClick={handleExplore}
						style={{backgroundColor: menuThemeColor}}
					/>
					<div className="menu-divider" />
					<MenuButton 
						text="Dashboard" 
						onClick={handleDashboard}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuButton 
						text="Animals" 
						onClick={handleAnimals}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuButton 
						text="Cooking (WIP)" 
						onClick={handleCooking}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuButton 
						text="Gardening" 
						onClick={handleGardening}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuButton 
						text="Maintenance (WIP)" 
						onClick={handleMaintenance}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuButton 
						text="News" 
						onClick={handleNews}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuButton 
						text="Notes"
						onClick={handleNotes}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuButton 
						text="Weather (WIP)" 
						onClick={handleWeather}
						style={{backgroundColor: menuThemeColor}}
					/>
					<div className="menu-divider" />
					{/* <MenuButton 
						text="Common Q&A" 
						onClick={handleQuestionsAndAnswers}
						style={{backgroundColor: menuThemeColor}}
					/> */}
					<div className="two-item-menu-line">
						<MenuButton 
							text="Pricing" 
							onClick={handlePricing} 
							style={{backgroundColor: menuThemeColor}}
						/>
						<MenuButton 
							text="Billing" 
							onClick={handleBilling}
							style={{backgroundColor: menuThemeColor}}
						/>
					</div>
					<div className="menu-divider" />
					<MenuButton 
						text="Q&A" 
						onClick={handleQuestionsAndAnswers}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuButton 
						text="Settings" 
						onClick={handleSettings}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuButton 
						text="Logout" 
						onClick={handleLogout}
						style={{backgroundColor: menuThemeColor}}
					/>
					<MenuAppColorPickers menuThemeColor={menuThemeColor.replace('rgb(', '').replace(')', '').split(',')} setMenuThemeColor={setMenuThemeColor}/>
				</>
			) : (
				<>
					<MenuButton text="Login" onClick={handleLogin} style={{backgroundColor: menuThemeColor}} />
					<MenuButton text="Create Account" onClick={handleCreateAccount} style={{backgroundColor: menuThemeColor}} />
				</>
			)}
			<div className="app-version">
				<span>Version: {process.env.REACT_APP_VERSION}</span>
			</div>
		</div>
	);
};
