import './css/dashboards/Maintenance.css';
import './css/dashboards/Settings.css';
import './css/dashboards/News.css';
import './css/dashboards/UserDashboard.css';
import './css/dashboards/Pricing.css';
import './css/general/App.css';
import './css/general/Buttons.css';
import './css/general/Content.css';
import './css/general/Forms.css';
import './css/general/Menu.css';
import './css/general/Modal.css';
import './css/general/Utilities.css';
import './css/components/ContentBills.css';
import './css/Extra.css';
import './css/Inputs.css';
import './css/Leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/elements/Header';
import RegisterForm from './components/forms/RegisterForm';
import LoginForm from './components/forms/LoginForm';
import Home from './Home';
import About from './About';
import Dashboard, { IUserProps } from './Dashboard';
import GeneralDashboard from './GeneralDashboard';
import Pricing from './Pricing';
import Gardening from './Gardening';
import Explore from './Explore';
import Weather from './Weather';
import PrivateRoute from './components/privateRoute';
import RouteNotFound from './RouteNotFound';
import { APIGetUserSubscriptionPlanResponse, ReturnPropsAPIGetUserSubscriptionPlanResponse } from './api/Common';
import Settings from './Settings';
import SettingsAccountInformation from './components/elements/dashboardElements/SettingsAccountInformation';
import SettingsPreferences from './components/elements/dashboardElements/SettingsPreferences';
import SettingsNotifications from './components/elements/dashboardElements/SettingsNotifications';
import SettingsSecurity from './components/elements/dashboardElements/SettingsSecurity';
import SettingsPrivacy from './components/elements/dashboardElements/SettingsPrivacy';
import SettingsHelp from './components/elements/dashboardElements/SettingsHelp';
import SettingsFeedback from './components/elements/dashboardElements/SettingsFeedback';
import News from './News';
import Maintenance from './Maintenance';
import QuestionsAndAnswers from './QuestionsAndAnswers';
import useScript from './components/Common';
import Animals from './Animals';
import Notes from './Notes';
import PrivacyPolicy from './PrivacyPolicy';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './AppHooks';
import { setSubscriptionStatus } from './slices/UserSlice';
import SecurityClearance, { AppFeatureType } from './components/privateRoute/SecurityClearance';
import Cooking from './Cooking';
import RecipeDetails from './components/elements/dashboardElements/RecipeDetails';
import PasswordPreResetForm from './components/forms/PasswordPreResetForm';
import PasswordResetOTPForm from './components/forms/PasswordResetOTPForm';
import PasswordResetForm from './components/forms/PasswordResetForm';
import { Button } from './components/elements/Button';
import Modal from './components/elements/Modal';
import FeedbackForm from './components/forms/FeedbackForm';
import GenericOkayForm from './components/forms/GenericOkayForm';
// https://react-icons.github.io/react-icons

function App() {
	const userPlan = useAppSelector(state => state.users.subscriptionPlan);
	const dispatch = useAppDispatch();
	const [isFeedbackFormOpen, setFeedbackFormOpen] = useState(false);
	const [isFeedbackSubmitFormOpen, setFeedbackSubmitFormOpen] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	useScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');  // we store our css with other css files and load js here
	useScript('https://kit.fontawesome.com/15f18dcaeb.js');

	useEffect(() => {
		// Scroll certain amounts from current position 
		window.scrollBy({ 
			top: 10, // could be negative value
			left: 0, 
			behavior: 'smooth' 
		});
	}, [])

	useEffect(() => {
        // console.log("User plan: ", userPlan);

    }, [userPlan])

	useEffect(() => {
		const fetchUserPlan = async () => {
			// Get user email
			let currentUser: IUserProps = JSON.parse(localStorage.getItem('user'));
			console.log("User localstorage data: ", currentUser);

			// Check for subscription plan
			if (currentUser != null) {
				let subscriptionResponse: ReturnPropsAPIGetUserSubscriptionPlanResponse = await APIGetUserSubscriptionPlanResponse(currentUser.email);

				// Set user plan from api if api supplies one, else assume free plan
				dispatch(setSubscriptionStatus(subscriptionResponse.subscriberPlan ? subscriptionResponse.subscriberPlan : SubscriptionPlan.Free));
			}
		}
		fetchUserPlan();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Periodically check if user has a subscription plan.
	useEffect(() => {
		const interval = setInterval(async () => {
			// Get user email
			let currentUser: IUserProps = JSON.parse(localStorage.getItem('user'));
			console.log("User localstorage data: ", currentUser);
			

			// Check for subscription plan
			if (currentUser != null) {
				let subscriptionResponse: ReturnPropsAPIGetUserSubscriptionPlanResponse = await APIGetUserSubscriptionPlanResponse(currentUser.email);

				// Set user plan from api if api supplies one, else assume free plan
				dispatch(setSubscriptionStatus(subscriptionResponse.subscriberPlan ? subscriptionResponse.subscriberPlan : SubscriptionPlan.Free));
				console.log("User plan: ", userPlan);
				
			}
		}, 600000);  // 10 minutes * 60 seconds * 1000 milliseconds = 600000 milliseconds
		return () => {
			clearInterval(interval);
		};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

	return (
		<div 
			className='App' 
			// onContextMenu={(e) => {
            // 	e.preventDefault(); // prevent the default behaviour when right clicked
            // 	console.log("Right Click");
			// 	// TODO: Implement right click menu with redux options and more.	
          	// }}
		  >
			<Header />
			<div className='app-content'>
				<Routes>
					<Route path='/' element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}  />
					<Route path='/about' element={ <About /> } />
					<Route path='/animals' element={<PrivateRoute><Animals /></PrivateRoute>} />
					<Route path='/cooking' element={<PrivateRoute><Cooking /></PrivateRoute>} />
					<Route path='/cooking/recipe/:id' element={<PrivateRoute><RecipeDetails /></PrivateRoute>} />
					<Route path='/dashboard' element={<PrivateRoute><Dashboard userPlan={userPlan}/></PrivateRoute>}>
						<Route path='' element={<GeneralDashboard />}/>
					</Route>
					<Route path='/explore' element={<PrivateRoute><Explore /></PrivateRoute>} />
					<Route path='/gardening' element={<PrivateRoute><Gardening /></PrivateRoute>} >
						<Route path=':month' element={<PrivateRoute><Gardening /></PrivateRoute>} />
					</Route>
					<Route path='/login' element={ <LoginForm userPlan={userPlan} /> } />
					<Route path='/privacy-policy' element={ <PrivacyPolicy /> } />
					<Route path='/pricing' element={ <Pricing /> } />
					<Route path='/register' element={ <RegisterForm /> } />
					<Route path='/pre-password-reset' element={ <PasswordPreResetForm /> } />
					<Route path='/password-reset-otp' element={ <PasswordResetOTPForm /> } />
					<Route path='/password-reset' element={ <PasswordResetForm /> } />
					<Route path='/maintenance' element={ <PrivateRoute><Maintenance /></PrivateRoute> } />
					<Route path='/notes' element={<PrivateRoute><Notes /></PrivateRoute>} />
					<Route path='/news' element={<PrivateRoute><News /></PrivateRoute>} />
					<Route path='/q&a' element={ <QuestionsAndAnswers /> } />
					<Route path='/settings' element={ <Settings /> } >
						<Route path='account-information' element={ <SettingsAccountInformation /> } />
						<Route path='preferences' element={ <SettingsPreferences /> } />
						<Route path='notifications' element={ <SettingsNotifications /> } />
						<Route path='security' element={ <SettingsSecurity /> } />
						<Route path='privacy' element={ <SettingsPrivacy /> } />
						<Route path='help' element={ <SettingsHelp /> } />
						<Route path='feedback' element={ <SettingsFeedback /> } />
					</Route>
					{/* Look closely below. The dashboards are children of the user dashboard. */}
					<Route path='/weather' element={<PrivateRoute><Weather /></PrivateRoute>} />
					<Route path='*' element={ <RouteNotFound /> } />
				</Routes>
			</div>
			<footer className='app-footer'>
				<Link to='/about'>About</Link>
				<Link to='/privacy-policy'>Privacy Policy</Link>
				<div className='feedback-container'>
					<Button text='Give Feedback' onClick={() => {setFeedbackFormOpen(!isFeedbackFormOpen)}} />
				</div>
			</footer>
			{isFeedbackSubmitFormOpen && (
                <GenericOkayForm title="Submitted!" description="Your feedback has been submitted." isShowingGenericOkayForm={setFeedbackSubmitFormOpen}/>
            )}
			{isFeedbackFormOpen && (
				<>
					<Modal
						title='Feedback'
						textInfo='Please provide feedback below.' 
						classes='feedback-modal'
						form={<FeedbackForm isFeedbackSubmitModal={setFeedbackSubmitFormOpen} isModelShowing={setFeedbackFormOpen} />}
					/>
				</>
			)}
		</div>
	);
}

export enum SubscriptionPlan {
	Free = 'Free',
	Base = 'Base',
	Packed = 'Packed',
}

export default App;
