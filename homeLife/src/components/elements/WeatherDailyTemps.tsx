import { _settings_weather } from "../../AppSettings";

interface IDailyTempProps {
    title: string,
    temp: number,
    isEnabled: boolean,
    dt: number,
    tempTypeClassName?: string
}

function WeatherDailyTemp(dailyTemp: IDailyTempProps) {

    return (
        <>
            {dailyTemp.isEnabled === true ? (
                <div className={"daily-forecast-temp " + dailyTemp.tempTypeClassName} key={ dailyTemp.title }>
                    <span>{ dailyTemp.title }</span>
                    <span>{ dailyTemp?.temp?.toFixed(0) }{ _settings_weather.units === 'metric' ? '°C' : '°F' }</span>
                </div>
            ) : (
                <></>
            )}
            
        </>
    );
}

export default WeatherDailyTemp;