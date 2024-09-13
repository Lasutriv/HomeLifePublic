// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Weather page of the HomeLife app.
// https://openweathermap.org/
// https://openweathermap.org/price
// https://openweathermap.org/api/one-call-3
// https://openweathermap.org/api/geocoding-api - Helps with getting the lat/long of a location by receiving location data when given a city name, state, country

import './css/dashboards/Weather.css';
import 'leaflet/dist/leaflet.css';

import { useEffect, useState } from "react";
import { getCorrectDomain } from "./AppSettings";
import { APIGetGeoLocation, APIGetUserSettings, APIGetWeatherData, APIGetWeatherRadarData } from "./api/Common";
import WeatherDailyTemp from "./components/elements/WeatherDailyTemps";
import { Chart, registerables } from "chart.js";
import { BsArrowUp, BsSunrise, BsSunset } from "react-icons/bs";
import { TabButton } from './components/elements/Button';
import { ImageOverlay, LayersControl, MapContainer, TileLayer, useMap } from 'react-leaflet'
import SecurityClearance, { AppFeatureType, AppSubFeatureType } from './components/privateRoute/SecurityClearance';
import { Link } from 'react-router-dom';
Chart.register(...registerables);

type WeatherLayer = 'clouds_new' | 'precipitation_new' | 'pressure_new' | 'wind_new' | 'temp_new'

function Weather() {
    const [weatherLocationCity, setWeatherLocationCity] = useState('');
    // const [weatherLocationState, setWeatherLocationState] = useState('MO');
    const [weatherLocation, setWeatherLocation] = useState('');
    const [weatherData, setWeatherData] = useState({} as WeatherProps);
    const [isHourlyTemp] = useState(true);
    const [isDailyTemp] = useState(true);
    const [selectionNumber, setSelectionNumber] = useState(0);
    const [shouldWeatherForecastReload, setShouldWeatherForecastReload] = useState(false);
    // Radar
    const [radarCenter] = useState([39.505, 98]);  // [lat, lon]
    const [radarImage, setRadarImage] = useState<string[]>([]);
    const [radarHeightWidth, setRadarHeightWidth] = useState({height: "512px", width: "512px"});
    // Default to center of US
    const [radarBounds] = useState([[39.38, -124.77], [0, -66.95]]);  // [[lat1, lon1], [lat2, lon2]  -- lat1, lon1 is top left, lat2, lon2 is bottom right
    const [radarZoom] = useState(0);
    // NOTE: WE SET THE BOUNDS TO MAX/MINS OF LAT/LON TO GET THE ENTIRE WORLD TO LINE UP WITH IMAGE OVERLAY. LEAFLET AND OWM USE 256PX TILES 
    const [radarImageOverlayBounds] = useState([[90, -180], [-90, 180]]);  // [[lat1, lon1], [lat2, lon2]  -- lat1, lon1 is top left, lat2, lon2 is bottom right
    // TOOD: Add user ability to select location and then store it in user preferences

    useEffect(() => {
        const getUserSettings = async () => {
            if (weatherLocationCity === '' || weatherLocationCity === undefined || weatherLocation === '' || weatherLocation === undefined) {
                const getUserSettingsResponse = await APIGetUserSettings();
                if (getUserSettingsResponse.response.length === 0) return;
                setWeatherLocationCity((prevState) => (getUserSettingsResponse.response[0].location.split(',')[0].trim()));
                setWeatherLocation((prevState) => (getUserSettingsResponse.response[0].location));
                console.log("Trying to set weather location city to: ", getUserSettingsResponse.response[0].location.split(',')[0].trim());
                console.log("Trying to set weather location to: ", getUserSettingsResponse.response[0].location);

                APIGetGeoLocation(getUserSettingsResponse.response[0].location.split(',')[0].trim()).then((data) => {
                    // console.log(data.response[0]);
                    APIGetWeatherData(data.response[0].lat, data.response[0].lon).then((data) => {
                        console.log(data.response);
                        setWeatherData(data.response);
                    });
                });            
            }
        }
        getUserSettings();
    });

    useEffect(() => {
        // Set temp chart with data from weatherData.hourly
        let tempChartCanvas = document.getElementById('hourly-forecast-chart') as HTMLCanvasElement;
        if (tempChartCanvas == null) return;
        let tempChartContext = tempChartCanvas.getContext('2d');
        // Trim some of the weather data to only show the next 48 hours
        weatherData?.hourly?.splice(48, weatherData?.hourly?.length - 48);
        let tempChartData = weatherData?.hourly?.map((hour: WeatherHourlyProps) => {
            return hour?.temp;
        });
        let tempChartLabels = weatherData?.hourly?.map((hour: WeatherHourlyProps) => {
            // Return the day as well as the hour and AM/PM
            return new Date(hour?.dt * 1000).toLocaleString('en-US', { weekday: 'short', hour: 'numeric', hour12: true });
        });
        console.log(tempChartLabels);
        
        let tempChart = new Chart(tempChartContext, {
            type: 'line',
            data: {
                labels: tempChartLabels,
                datasets: [{
                    label: 'Temperature',
                    data: tempChartData,
                    fill: false,  // Don't fill area under the line
                    borderColor: 'green',  // The main line color
                    tension: 0.1,  // Smoothes out the line
                    pointRadius: 0,  // Don't show points on the line
                    backgroundColor: 'green',
                    borderWidth: 2,  // Line border as well as... legend border... Idk why
                    
                    hoverBorderWidth: 5,
                    hoverBorderColor: 'green',
                    // hoverBackgroundColor: '#ffff',
                    // backgroundColor: '#ffff'
                    segment: {
                        borderColor:function(context){
                            // Color temps into multiple categories based on the temp
                            // Categories: 0-32, 33-50, 51-70, 71-90, 91-110, 111+
                            const temp = context.p0.parsed.y;
                            if (temp >= 111){
                                return "red"
                            } else if (temp >= 91){
                                return "orange"
                            } else if (temp >= 71){
                                return "yellow"
                            } else if (temp >= 51){
                                return "green"
                            } else if (temp >= 33){
                                return "blue"
                            } else {
                                return "purple"
                            }
                        }
                    },
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                },
                interaction: {
                    intersect: false
                },
                plugins: {
                    // ignore error
                    // @ts-ignore
                    legend: {
                        labels: {
                            usePointStyle: true,
                        }
                    },
                    
                }
            },            
        });

        tempChart.update();
        setShouldWeatherForecastReload(false);

        return () => {
            // Cleanup
            tempChart.destroy();
        }
    }, [weatherData, weatherLocationCity, shouldWeatherForecastReload]);

    useEffect(() => {
        setNewRadarHeightWidth();
    }, [radarCenter, radarBounds, radarZoom, radarHeightWidth]);

    const setNewRadarHeightWidth = () => {
        // Get weather-radar height and width and set map/leaflet to the size of the radar space on the page
        const weatherRadar = document.getElementsByClassName('weather-radar')[0] as HTMLDivElement;
        if (weatherRadar == null) return;
        const height = weatherRadar?.clientHeight;
        const width = weatherRadar?.clientWidth;
        const leafletContainer = document.getElementsByClassName('leaflet-container')[0] as HTMLDivElement;
        if (leafletContainer == null) return;
        leafletContainer.style.height = height + 'px';
        leafletContainer.style.width = width + 'px';
        setRadarHeightWidth({height: height + 'px', width: width + 'px'});
    }

    const getColorClassNameBasedOnTemp = (temp: number) => {
        if (temp >= 111){
            return "scorching"
        } else if (temp >= 91){
            return "hot"
        } else if (temp >= 71){
            return "warm"
        } else if (temp >= 51){
            return "cool"
        } else if (temp >= 33){
            return "cold"
        } else {
            return "freezing"
        }
    }

    const handleSelectGeneral = (e) => {
        setSelectionNumber(0);
        setShouldWeatherForecastReload(true);
        e.preventDefault();
    }

    const handleSelectRadar = async (e) => {
        const rainLayer: WeatherLayer = 'precipitation_new';
        const windLayer: WeatherLayer = 'wind_new';
        const pressureLayer: WeatherLayer = 'pressure_new';
        const tempLayer: WeatherLayer = 'temp_new';
        const cloudLayer: WeatherLayer = 'clouds_new';
        const mapLayers = [rainLayer, windLayer, pressureLayer, tempLayer, cloudLayer];
        // Radar layer coordinate information: https://prnt.sc/jQdpMB8J2n5P
        // For convenience it is assumed that at zoom level 0, an entire Mercator projection of the Earth is contained in one tile
        // with a shape of 256x256 pixels. For each further zoom level all tiles of previous zoom level is divided into 4 parts. 
        // This leads to the spatial resolution (ground meters per pixel) of each tile roughly doubles and the number of tiles 
        // increases by a factor of four. For example, at zoom level 1, the map consists of 4 tiles with a shape of 256x256 pixels, 
        // resulting in an image with a total shape of 512x512 pixels. At any given zoom level, a specific tile can be identified 
        // by Cartesian coordinates with 0,0 starting in the top left of the map with the X coordinate values increasing from west 
        // to east and Y coordinate values increasing from north to south.
        // const agencies = await Promise.all(opportunities.map(apiHandler.getOpportunityAgencies));
        const images = await Promise.all(mapLayers.map(async (layer) => {
            const radarResponse = await APIGetWeatherRadarData(layer, 0, 0, 0);
            console.log("Radar response: ", radarResponse); 
            return radarResponse?.imageRef;
        }));
        setRadarImage(images);
        console.log("Images: ", images);
        
        
        setSelectionNumber(1);
        e.preventDefault();
    }

    function MapContructorComponent() {
        const map = useMap();
        map.invalidateSize();
        return null;
    }

    // TODO: Make api calls and change radar images based on zoom, then bounds. Bounds will be a difficult one so we can leave it last
    function MapComponent() {
        return (
            <MapContainer 
                center={radarCenter as any} 
                bounds={radarBounds as any}
                boundsOptions={{padding: [0, 0]}}
                zoom={radarZoom} 
                zoomSnap={0}
                scrollWheelZoom={true}
                style={{height: radarHeightWidth.height, width: radarHeightWidth.width}}
                // @ts-ignore
                whenReady={(e) => {
                    e.target.invalidateSize();
                    e.target.fitBounds(radarBounds);
                    const weatherRadar = document.getElementsByClassName('weather-radar')[0] as HTMLDivElement;
                    if (weatherRadar == null) return;
                    const height = weatherRadar?.clientHeight;
                    const width = weatherRadar?.clientWidth;
                    const leafletContainer = document.getElementsByClassName('leaflet-container')[0] as HTMLDivElement;
                    if (leafletContainer == null) return;
                    leafletContainer.style.height = height + 'px';
                    leafletContainer.style.width = width + 'px';
                    // setRadarHeightWidth({height: height + 'px', width: width + 'px'});
                }}
            >
                <MapContructorComponent />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ImageOverlay 
                    url={ getCorrectDomain() + radarImage } 
                    // Double size of image to make it more clear
                    bounds={radarImageOverlayBounds as any}
                    className='image-owm-map'
                />
                {/* https://react-leaflet.js.org/docs/example-layers-control/ */}
                <LayersControl position="topright">
                    <LayersControl.Overlay name="Precipitation">
                        <ImageOverlay 
                            url={ getCorrectDomain() + radarImage[0] } 
                            // Double size of image to make it more clear
                            bounds={radarImageOverlayBounds as any}
                            className='image-owm-map'
                        />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Wind">
                        <ImageOverlay 
                            url={ getCorrectDomain() + radarImage[1] } 
                            // Double size of image to make it more clear
                            bounds={radarImageOverlayBounds as any}
                            className='image-owm-map'
                        />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Pressure">
                        <ImageOverlay 
                            url={ getCorrectDomain() + radarImage[2] } 
                            // Double size of image to make it more clear
                            bounds={radarImageOverlayBounds as any}
                            className='image-owm-map'
                        />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Temperature">
                        <ImageOverlay 
                            url={ getCorrectDomain() + radarImage[3] } 
                            // Double size of image to make it more clear
                            bounds={radarImageOverlayBounds as any}
                            className='image-owm-map'
                        />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Clouds">
                        <ImageOverlay 
                            url={ getCorrectDomain() + radarImage[4] } 
                            // Double size of image to make it more clear
                            bounds={radarImageOverlayBounds as any}
                            className='image-owm-map'
                        />
                    </LayersControl.Overlay>
                </LayersControl>
                {/* <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
        );
    }

    return (
        <div className='common-container weather-container'>
            <SecurityClearance 
                callback={() => {
                    setShouldWeatherForecastReload(true);
                }}
                featureType={AppFeatureType.Weather} 
                subFeatureType={AppSubFeatureType.WeatherData}
                feature={
                    <>
                        <div className='top-bar'>
                            <div className='garden-options'>
                                <TabButton classes={selectionNumber === 0 ? ('selected') : ('')} text='General' onClick={handleSelectGeneral}/>
                                <TabButton classes={selectionNumber === 1 ? ('selected') : ('')} text='Radar' onClick={handleSelectRadar}/>
                                {/* <TabButton classes={selectionNumber == 4 ? ('selected') : ('')} text='Ornaments' onClick={handleSelectOrnaments}/>
                                <TabButton classes={selectionNumber == 5 ? ('selected') : ('')} text='Miscellaneous' onClick={handleSelectMiscellaneous}/> */}
                            </div>
                        </div>
                        {selectionNumber === 0 && (
                            <>
                                <div className="weather-titles">    
                                    <h3>Location: { weatherLocation ? (weatherLocation) : <span style={{color: "red"}}>No location selected, view your settings!</span> }</h3>
                                    <h3 id='hourly-forecast' className='show-desktop'>Hourly Forecast</h3>
                                </div>
                                <div className="weather-tabs">
                                    <div className="weather-current">
                                        <div className="weather-header-left">
                                            <div className="current-date-time">{ new Date(weatherData?.current?.dt * 1000).toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true }) }</div>
                                            <div className="weather">{ weatherData?.current?.weather[0]?.main }</div>
                                        </div>
                                        <div className="weather-header-right">
                                        <div className="temp">{ weatherData?.current?.temp.toFixed(0) }°F</div>
                                            <div className="feels-like">Feels like { weatherData?.current?.feels_like.toFixed(0) }°F</div>
                                            {/* We need to calculate the precipitation for the next how and give that data. OWA does not supply a % of precipitation */}
                                            {/* <div className="precipitation">Precipitation: { weatherData.current.precipitation }%</div> */}
                                            <div className="humidity">{ weatherData?.current?.humidity }% humidity</div>
                                            <div className="wind-speed">Wind: { weatherData?.current?.wind_speed } mph</div>
                                            {/* Change the weather description to a set of images based on the description */}
                                            <div className="wind-deg">Wind: { weatherData?.current?.wind_deg }° <BsArrowUp style={{rotate: weatherData?.current?.wind_deg + 'deg'}} /></div>
                                            <div className="clouds">Clouds: { weatherData?.current?.clouds }%</div>
                                        </div>
                                        <div className="weather-extras">
                                            <div className="sunrise">Sunrise: { new Date(weatherData?.current?.sunrise * 1000).toLocaleTimeString() }<BsSunrise /></div>
                                            <div className="sunset">Sunset: { new Date(weatherData?.current?.sunset * 1000).toLocaleTimeString() }<BsSunset /></div>
                                        </div>
                                        <div className="current-forecast">

                                        </div>
                                    </div>
                                    <h3 id='hourly-forecast' className='show-mobile'>Hourly Forecast</h3>
                                    <div className="weather-hourly">
                                        <div className="hourly-forecast">
                                            {/* Chart of temps */}
                                            <div className="hourly-forecast-chart">
                                                <canvas id="hourly-forecast-chart"></canvas>
                                            </div>
                                            <h4>The temperature over the next 10 hours:</h4>
                                            <div className='hourly-forecast-items'>
                                                { weatherData?.hourly?.map((hour: WeatherHourlyProps, index) => {
                                                    // eslint-disable-next-line array-callback-return
                                                    if (index > 9) return;
                                                    return (
                                                        <div className="hourly-forecast-item" key={index}>
                                                            {/* Trim temp to 2 digits and no decimals */}
                                                            {isHourlyTemp ? <div className="hourly-forecast-time">{ new Date(hour?.dt * 1000).toLocaleString('en-US', { hour: 'numeric', hour12: true }) }</div> : <div className="hourly-forecast-time">--</div> }
                                                            {isHourlyTemp ? <div className={"hourly-forecast-temp " + getColorClassNameBasedOnTemp(hour?.temp)}>{ hour?.temp?.toFixed(0) }°F</div> : <div className="hourly-forecast-temp">-- °F</div> }
                                                        </div>
                                                    );
                                                }) }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weather-daily">
                                        <h3>Daily Forecast</h3>
                                        <div className="daily-forecast">
                                            { weatherData?.daily?.map((day: WeatherDailyProps, index) => {
                                                // eslint-disable-next-line array-callback-return
                                                if (index > 6) return;
                                                return (
                                                    <div className="daily-forecast-item" key={index}>
                                                        <div className="daily-forecast-day">{ new Date(day?.dt * 1000).toLocaleString('en-US', { weekday: 'long' }) }</div>
                                                        <WeatherDailyTemp title="Morn" temp={ day?.temp?.morn } isEnabled={ isDailyTemp } dt={day?.dt} tempTypeClassName={"morn "  + getColorClassNameBasedOnTemp(day?.temp?.morn)} />
                                                        <WeatherDailyTemp title="Noon" temp={ day?.temp?.day } isEnabled={ isDailyTemp } dt={day?.dt} tempTypeClassName={"current " + getColorClassNameBasedOnTemp(day?.temp?.day)} />
                                                        <WeatherDailyTemp title="Eve" temp={ day?.temp?.eve } isEnabled={ isDailyTemp } dt={day?.dt} tempTypeClassName={"eve " + getColorClassNameBasedOnTemp(day?.temp?.eve)} />
                                                        <WeatherDailyTemp title="Night" temp={ day?.temp?.night } isEnabled={ isDailyTemp } dt={day?.dt} tempTypeClassName={"night " + getColorClassNameBasedOnTemp(day?.temp?.night)} />
                                                        <WeatherDailyTemp title="High" temp={ day?.temp?.max } isEnabled={ isDailyTemp } dt={day?.dt} tempTypeClassName={"high " + getColorClassNameBasedOnTemp(day?.temp?.max)} />
                                                        <WeatherDailyTemp title="Low" temp={ day?.temp?.min } isEnabled={ isDailyTemp } dt={day?.dt} tempTypeClassName={"low " + getColorClassNameBasedOnTemp(day?.temp?.min)} />
                                                    </div>
                                                );
                                            }) }
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {selectionNumber === 1 && (
                            <SecurityClearance 
                                featureType={AppFeatureType.Weather} 
                                subFeatureType={AppSubFeatureType.WeatherRadar}
                                feature={
                                    <div className='weather-radar'>
                                        <div className='weather-radar-content' style={{height: radarHeightWidth.height, width: radarHeightWidth.width}}>
                                            {/* <img src='https://tile.openweathermap.org/map/wind_new/4/1/1.png?appid=0619230886a493b0cdcdffeae022f1f0' /> */}
                                            {/* <img className='image-owm-map' src={ getCorrectDomain() + radarImage } /> */}
                                            <div id="map" style={{height: radarHeightWidth.height, width: radarHeightWidth.width}}>
                                                <div className='map-layers'>
                                                    
                                                </div>
                                                <MapComponent />
                                            </div>
                                        </div>
                                    </div>
                                }
                                noClearanceNote={
                                    <>Weather Radar</>
                                }
                            />
                        )}
                    </>
                }
            />
        </div>
    );
}

interface WeatherProps {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: WeatherCurrentProps;
    minutely: WeatherMinutelyProps[];
    hourly: WeatherHourlyProps[];
    daily: WeatherDailyProps[];
}

interface WeatherCurrentProps {
    dt: number;
    dew_point: number;
    temp: number;
    clouds: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    visibility: number;
    uvi: number;
    wind_speed: number;
    wind_deg: number;
    sunrise: number;
    sunset: number;
    weather: WeatherWeatherProps[];
}

interface WeatherMinutelyProps {
    dt: number;
    precipitation: number;
}

interface WeatherHourlyProps {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: WeatherWeatherProps[];
    pop: number;
}

interface WeatherDailyProps {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: WeatherDailyTempProps;
    feels_like: WeatherDailyFeelsLikeProps;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: WeatherWeatherProps[];
    clouds: number;
    pop: number;
}

interface WeatherDailyTempProps {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

interface WeatherDailyFeelsLikeProps {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

interface WeatherWeatherProps {
    id: number;
    main: string;
    description: string;
    icon?: string;
}

export default Weather;