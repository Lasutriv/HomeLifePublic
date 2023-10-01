// https://www.missouribotanicalgarden.org/gardens-gardening/your-garden/help-for-the-home-gardener/advice-tips-resources/gardening-by-month
// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Gardening page of the HomeLife app.
import { useNavigate } from 'react-router-dom';
import './css/dashboards/Explore.css'

function Explore() {
    const navigate = useNavigate();

    return (
        <div className='common-container explore-container'>
            <h3>Explore Our Features</h3>
            <div className="explore-container-items">
                <div className="explore-item">
                    <a onClick={() => {navigate('/weather')}}>
                        <div className="shadow" />
                        <img src={require("./files/explore/Weather.png")} alt="weather" />
                        <div className='text-wrapper'>
                            <h4>Weather</h4>
                            <p>See the weather in your area and learn more about what's happening around the world.</p>
                        </div>
                    </a>
                </div>
                <div className="explore-item">
                    <a onClick={() => {navigate('/news')}}>
                        <div className="shadow" />
                        <img src={require("./files/explore/News.png")} alt="news" />
                        <div className='text-wrapper'>
                            <h4>News</h4>
                            <p>See the latest news in your area by plugging in your favorite news sources.</p>
                        </div>
                    </a>
                </div>
                <div className="explore-item">
                    <a onClick={() => {navigate('/gardening')}}>
                        <div className="shadow" />
                        <img src={require("./files/explore/Gardening.png")} alt="news" />
                        <div className='text-wrapper'>
                            <h4>Gardening</h4>
                            <p>Learn how to garden in your area.</p>
                        </div>
                    </a>
                </div>
                <div className="explore-item">
                    <a onClick={() => {navigate('/maintenance')}}>
                        <div className="shadow" />
                        <img src={require("./files/explore/Maintenance.png")} alt="news" />
                        <div className='text-wrapper'>
                            <h4>Maintenance</h4>
                            <p>Learn how to maintain your home and keep it in tip-top shape.</p>
                        </div>
                    </a>
                </div>
                <div className="explore-item">
                    <a onClick={() => {navigate('/cooking')}}>
                        <div className="shadow" />
                        <img src={require("./files/explore/Cooking.png")} alt="news" />
                        <div className='text-wrapper'>
                            <h4>Cooking</h4>
                            <p>Save your favorite recipes and learn how to cook new ones.</p>
                        </div>
                    </a>
                </div>
                <div className="explore-item">
                    <a onClick={() => {navigate('/hobbies')}}>
                        <div className="shadow" />
                        <img src={require("./files/explore/Hobbies.png")} alt="news" />
                        <div className='text-wrapper'>
                            <h4>Hobbies</h4>
                            <p>Learn about new hobbies and how to get started.</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Explore;