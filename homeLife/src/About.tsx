// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the About page of the HomeLife app.

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Button } from "./components/elements/Button";
import { useNavigate } from "react-router";
import './css/components/About.css';
import { Link } from "react-router-dom";

function About() {
    const navigate = useNavigate();
    const whatIsHomeLife = useRef(null);
    const whatIsHomeLifeTyped = useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                'The Hub for Home Life',
                'Your Home is Worth Managing',
                'Where Convenience Meets Control',
                'The App That Puts You in Command',
                'From Chaos to Harmony',
                "Spending Less Time Managing, More Time Living"
          ],
          typeSpeed: 50, backSpeed: 25,
        };
        
        // elRef refers to the <span> rendered below
        whatIsHomeLifeTyped.current = new Typed(whatIsHomeLife.current, options);
        
        return () => {
          // Make sure to destroy Typed instance during cleanup
          // to prevent memory leaks
          whatIsHomeLifeTyped.current.destroy();
        }
    }, []);

    return (
        <div className='about-container'>
            <div className="about-header">
                <div className="hero-image-container">
                    <div className="shadow" />
                    {/* <img src={require('./files/splashScreens/Splash-Screen-V2.png')} alt="Hero" /> */}
                    <img src={require('./files/splashScreens/Home-in-the-Woods.png')} alt="Hero" />
                </div>
                <div className="splash-screen-text">
                    <div className="top-section">
                        <div className="bar-left"></div>
                        <div className="logo-container">
                            <img src={require('./files/logo/Logo512.png')} alt="Logo" />
                        </div>
                        <div className="bar-right"></div>
                    </div>
                    <div className="typewriter-container text-center">
                        <h3 ref={whatIsHomeLife}>The Hub for Home Life</h3>
                    </div>
                </div>
            </div>
            <div className="about-left">
                <div className="about-left-content">
                    <div className="bottom-spread">
                        {/* TODO: Add icons of each plan here */}
                        <h1>Utilize one cohesive app for all aspects of home life</h1>
                        <div className="app-features">
                            <div className="feature">Bill Tracking</div>
                            <div className="feature">Maintenance Tracking</div>
                            <div className="feature">Project/Work Tracking</div>
                            <div className="feature">Task Tracking</div>
                            <div className="feature">Real-time Weather Data</div>
                            <div className="feature">Gardening Wiki</div>
                            <div className="feature">Garden Layout Builder</div>
                            <div className="feature">News Aggregation</div>
                            <div className="feature">Gas Pricer</div>
                            <div className="feature">And More!</div>
                        </div>
                    </div>
                    <div className="buttons-and-links">
                        <Button 
                            text='Subscribe Now' 
                            onClick={() => {
                                window.location.href = '/pricing';
                            }} 
                        />
                        <Link to='/q&a'>
                            <span>Learn More</span>
                        </Link>
                        {/* <Button 
                            text='Learn More' 
                            onClick={() => {
                                window.location.href = '/q&a';
                            }} 
                        /> */}
                    </div>
                </div>
            </div>
            <div className="about-center">
                <div className="about-center-content">
                    
                </div>
            </div>
            <div className="about-right">
                <div className="about-right-content">
                    <div className="hero-image-container">
                        <div className="shadow" />
                        <img src={require('./files/splashScreens/Splash-Screen-V2.png')} alt="Hero" />
                        {/* <img src={require('./files/splashScreens/Home-in-the-Woods.png')} alt="Hero" /> */}
                    </div>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/AIA.DMW.LLC"><i className="fab fa-facebook-square"></i></a>
                        <a href="https://www.instagram.com/dmw_llc/"><i className="fab fa-instagram-square"></i></a>
                        <a href="https://twitter.com/DMW_LLC"><i className="fab fa-twitter-square"></i></a>
                    </div>
                </div>
            </div>
            {/* <div className='lifted-container'>
                <div className="typewriter-container">
                    <h3 ref={whatIsHomeLife}>The Hub for Home Life</h3>
                </div>
                <p>
                    MyHomeLife is an app to help you keep track of various different topics important to everyday life.
                    Such examples include the following:
                </p>
                <ul>
                    <li>Project/Work Time Tracking - Clock in/out system</li>
                    <li>Bill Tracking - Includes reminders and due dates</li>
                    <li>Task Tracking - Includes reminders and due dates</li>
                    <li>Real-time weather data</li>
                    <li>My Garden - Library of gardening resources and custom garden building functionality</li>
                </ul>
                <h3>Are there different versions I can use?</h3>
                <p>Not at this time. It's free for now.</p>
            </div> */}
        </div>
    );
}

export default About;