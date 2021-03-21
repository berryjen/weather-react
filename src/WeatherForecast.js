import React, {useState} from "react";
import axios from "axios";
 import WeatherForecastPreview from "./WeatherForecastPreview";
export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);
 
  function handleForecastResponse(response) {
    setForecast(response.data); 
    setLoaded(true);
  }
    
  if (loaded && props.city=== forecast.city.name) {
    return (
      <div className="WeatherForecast row">
        <div className= "WeatherForecast col">
          {forecast.list.slice(0,6).map(function(forecastItem) {
            return <WeatherForecastPreview data={forecastItem} />; 
          })}
             </div>        
      </div>
    );
  } else {
  let apiKey= "f080158c041532d07353f9c3c3fc3150";
  let url= `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(handleForecastResponse);
  return null;
  }
 
}