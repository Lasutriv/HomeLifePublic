import './css/App.css';
import './css/buttons.css';
import './css/content.css';
import './css/ContentBills.css';
import './css/extra.css';
import './css/forms.css';
import './css/modal.css';

// import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/elements/Header';
import RegisterForm from './components/forms/RegisterForm';
import LoginForm from './components/forms/LoginForm';
import Dashboard from './Dashboard';
import GeneralDashboard from './GeneralDashboard';
import PrivateRoute from './components/privateRoute';
import RouteNotFound from './RouteNotFound';
import Home from './Home';
import About from './About';

function App() {
	return (
		<div className='App'>
			<Header />
			<div className='app-content'>
				<Routes>
					<Route exact path='/' element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}  />
					<Route exact path='/about' element={ <About /> } />
					<Route exact path='/login' element={ <LoginForm /> } />
					<Route exact path='/register' element={ <RegisterForm /> } />
					{/* Look closely below. The dashboards are children of the user dashboard. */}
					<Route exact path='/dashboard' element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}>
						<Route path='' element={
							<GeneralDashboard />
						}/>
					</Route>
					<Route path='*' element={ <RouteNotFound /> } />
				</Routes>
			</div>
			<footer className='app-footer'>
				<a href='/about'>About</a>
			</footer>
		</div>
	);
}

export default App;
