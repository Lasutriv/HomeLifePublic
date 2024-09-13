// Tanner Fry
// Component for the home page of the app.

import React, { useState } from 'react';
import { CHANGE_LOG_DATA } from './components/ChangeLogData';

function Home() {
	const [selectedCategory, setSelectedCategory] = useState('');

	const handleChangeListCategoryClick = (aCategory : string) => {
		if (selectedCategory === aCategory) {
			setSelectedCategory('');
			return;
		} else {
			setSelectedCategory(aCategory);
		}
	}

	return (
		<div className='homepage-container'>
			<div className='latest'>
				<div className='update'>
					<div className='body'>
						<div className='date'>Latest update: 9/28/23</div>
						<div className='title'>Latest Major Changes</div>
						<div className='change-list'>
							<div className='category-card'>
								<div className='category'>Animals</div>
								<div className='category-content'>Whether you have livestock or pets, you can track vaccinations, surgeries, and more with the Animal dashboard</div>
							</div>
							<div className='category-card'>
								<div className='category'>Bills (Main Dashboard)</div>
								<div className='category-content'>
									Keep track of your bills, when due, and if you'd like reminders or to share with others
									<ul>
										<li>Bills can be shown in a list or grid view for ease of viewing</li>
										<li>Bills now have 3 KPIs showing bill totals; Your Bills, Shared Bills, and Total Bills</li>
										<li>Bills can be shared amongst others (Friends list to be integrated)</li>
									</ul>	
								</div>
							</div>
							<div className='category-card'>
								<div className='category'>Cooking (WIP)</div>
								<div className='category-content'>
									Keep track of your recipes, cooking information, groceries, and pantry all in one place. <br/><br/>Ever wanted to go shopping and
									know that when you mark off an item from your grocery list, it's also added to your pantry? Now you can with the MyHomeLife Cooking
									dashboard!
								</div>
							</div>
							<div className='category-card'>
								<div className='category'>Tasks (Main Dashboard)</div>
								<div className='category-content'>Utilize tasks to remind yourself with what's on your plate.</div>
							</div>
							<div className='category-card'>
								<div className='category'>Maintenance (WIP)</div>
								<div className='category-content'>
									Keep track of home maintenance tasks that everyone has:
									<ul>
										<li>Track common home maintenance tasks</li>
										<li>Track current objectives set by yourself</li>
									</ul>
								</div>
							</div>
							<div className='category-card'>
								<div className='category'>My Garden</div>
								<div className='category-content'>
									Trying to live healthier? Check out our library of gardening information for fruits, vegetables, and helpful tips. Do note that
									we provide garden layout builders so you can store designs of your garden with each and every garden you create.
								</div> 
							</div>
							<div className='category-card'>
								<div className='category'>News</div>
								<div className='category-content'>Grab the latest news from across the world.</div>
							</div>
							<div className='category-card'>
								<div className='category'>Notes</div>
								<div className='category-content'>Keep track of your notes with our sticky-note like board! Encrypted notes coming soon!</div>
							</div>
							<div className='category-card'>
								<div className='category'>Weather (WIP)</div>
								<div className='category-content'>Real-time weather data for your location.</div>
							</div>
							<div className='category-card'>
								<div className='category'>Weekly Work (Main Dashboard)</div>
								<div className='category-content'>Our integrated clock-in/out system lets you track your time at work or working on a particular project.</div>
							</div>
						</div>
						<div className='centered-list'>
							<div className='title'>Upcoming Changes</div>
							<div className='upcoming-change-list'>
								<ul>
									<li className={'category ' + (selectedCategory === 'web-integrations' ? 'selected' : '')} onClick={() => {
										handleChangeListCategoryClick("web-integrations");
									}}>Web Integrations</li>
									<ul>
										{/* <li>Gardening Cycles and Best Practices Dashboard</li> */}
										{/* <li>Weather Dashboard</li> */}
										{/* <li>News Dashboard</li> */}
										<li>Bills Addition - Friends List</li>
										<li>Hobby Dashboard</li>
										{/* <li>Maintenance Dashboard</li> */}
										<li>Security Dashboard</li>
										<li>Automation Dashboard</li>
										<li>Energy and Water Dashboard</li>
										<li>Gas Dashboard</li>
										<li>Service map (electricians, plumbers) or list of local services</li>
										{/* <li>Health Dashboard</li> */}
										{/* <li>Finance Dashboard</li> */}
										{/* Chat GPT dashboard for ease of use - Call it, "Your AI" */}
										<li>Education Dashboard</li>
										<li>Travel Dashboard</li>
										{/* <li>Animal Dashboard</li> */}
										{/* <li>Family Dashboard</li> */}
										<li>Memberships Dashboard</li>
									</ul>
									<li className={'category ' + (selectedCategory === '3rd-party-integrations' ? 'selected' : '')} onClick={() => {
										handleChangeListCategoryClick("3rd-party-integrations");
									}}>3rd Party Integrations</li>
									<ul>
										<li>Google/Apple calendars for bills and tasks</li>
									</ul>
									<li className={'category ' + (selectedCategory === 'lan-integrations' ? 'selected' : '')} onClick={() => {
										handleChangeListCategoryClick("lan-integrations");
									}}>LAN Integrations</li>
									<ul>
										<li>Automatic garden watering based on moisture and historical watering</li>
										<li>Automatic thermostat control based on temperature and historical temperature</li>
										<li>Automatic light control based on time of day and historical light usage</li>
										<li>Automatic door lock control based on time of day and historical door usage</li>
										<li>Automatic garage door control based on time of day and historical garage door usage</li>
										<li>Automatic sprinkler control based on time of day and historical sprinkler usage</li>
										<li>Automatic security system control based on time of day and historical security system usage</li>
									</ul>
								</ul>
							</div>
							<div className='title'>Detailed Change Log</div>
							<div className='change-log'>
								{CHANGE_LOG_DATA.map((changeLog, index) => (
									<div className='change-log-card' key={index}>
										<div className='change-log-title'>{changeLog.title}</div>
										<div className='change-log-date'>{changeLog.date}</div>
										<div className='change-log-list'>
											<ul>
												{changeLog.changes.map((change, index) => (
													<li key={index}>{change}</li>
												))}
											</ul>
										</div>
									</div>
								))}	
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;