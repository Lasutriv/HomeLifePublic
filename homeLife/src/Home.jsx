// Tanner Fry
// Component for the home page of the app.

import React from 'react';

function Home() {
	return (
		<div className='homepage-container'>
			<div className='latest'>
				<div className='update'>
					<div className='date'>1/8/23</div>
					<div className='title'>Weekly Work/Bills/Tasks</div>
					<div className='body'>
						<div className='change-list'>
							<ul>
								<li className='category'>Weekly Work</li>
								<ul>
									<li>Added:</li>
									<ul>
										<li>Users have the ability to clock in/out/break for a day or clock their entire day</li>
									</ul>
								</ul>
								<li className='category'>Bills</li>
								<ul>
									<li>Added:</li>
									<ul>
										<li>Bills can be shown in a list or grid view for ease of viewing</li>
										<li>Bills now have 3 KPIs showing bill totals; Your Bills, Shared Bills, and Total Bills</li>
									</ul>
								</ul>
								<li className='category'>Tasks</li>
								<ul>
									<li>Added:</li>
									<ul>

									</ul>
								</ul>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;