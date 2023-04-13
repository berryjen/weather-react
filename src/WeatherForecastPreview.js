 import React from "react";
 import WeatherIcon from "./WeatherIcon";

 export default function WeatherForecastPreview(props) {
    function hours() {
      let date= new Date(props.data.dt * 1000);
      let hours= date.getHours();
      return `${hours}:00`;
    }

    function temperature() {
      let temperature= Math.round(props.data.main.temp);
      return `${temperature}ºC`;
    }

    return(
        <div className="col-2">
          <p>{hours()}</p>
          <WeatherIcon code={props.data.weather[0].icon} />
          <p>{temperature()}</p>
        </div>
    );
 }
 
 