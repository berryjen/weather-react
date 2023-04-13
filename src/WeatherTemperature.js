import React, { useState} from "react";

export default function WeatherTemperature(props) {
  const [unit, setUnit]= useState("celsius");
  function displayFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function displayCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  function fahrenheit() {
    return (props.celsius *9)  /5 + 32;
  }

  if (unit=== "celsius") {
     return (
       <div className="weatherTemperature">
       <span className="temperature">{Math.round(props.celsius)}</span>
       <span className= "unit">
        °C   {" "}
         <a href="/" id="fahrenheit-link" onClick={displayFahrenheit}>
            °F
        </a>
        </span>
      </div>
  );
     } else {
    return (
       <div className="weatherTemperature">
        <span className="temperature">{Math.round(fahrenheit())}</span>
        <span className="unit">
        <a href="/" id="celsius-link" onClick={displayCelsius}>
           °C 
        </a>{" "}
           °F
       </span>
      </div>
    );
  }
}
