import React, { useState } from "react";
import axios from"axios";
import Loader from "react-loader-spinner";


function formatHours(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
      if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${formatHours(timestamp)}`;
}

export default function CurrentWeather(props) {
  let currentTime = new Date();
  const [weatherData, setWeatherData] = useState({ready: false});
  const[city, setCity] = useState(props.defaultCity);
  function handleResponse(response) {
    setWeatherData({
      temperature: Math.round(response.data.main.temp),
      ready: true,
      wind: Math.round(response.data.wind.speed),
      city: response.data.name,
      humidity: response.data.main.humidity,
      temp_min: Math.round(response.data.main.temp_min),
      temp_max: Math.round(response.data.main.temp_max),
      iconUrl: "https://www.iconsdb.com/icons/preview/tropical-blue/cloud-4-xxl.png",
      description: response.data.weather[0].description
    });
  }

  function search() {
    const apiKey = "f080158c041532d07353f9c3c3fc3150";
    let unit= "metirc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(handleResponse);
  
  }
 
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

if (weatherData.ready) {
  return (
    <div className="container">
      <div className="row mt-5 text-center">
        <div className="col">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                id="cityInput"
                class="search"
                autofocus="on"
                placeholder="City"
                autocomplte="off"
                onChange={handleCityChange}
              />
            </form>
            <h2></h2>

            <div className="row text-center">
              <div className="col">
                <ul>
                  <strong>
                    <h4 className="date-time" id="day-time">
                       {formatDate(currentTime)}
                    </h4>
                  </strong>
                </ul>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6 text-center">
                <h1 className="city-name" id="city">
                  {weatherData.city}
                </h1>
                <h3 class>
                  <span className="current-weather-condition"></span>
                  <img src="" alt="" id="icon" class="float-left" />
                </h3>
                <div className="temp">
                  <div className="temp">
                    <h1 span className="temp">
                      <span id="temperature">{weatherData.temperature}</span>
                      <sup className="sup" id="">
                        {" "}
                        <a href="/" id="celsius-link">
                          °C
                        </a>
                      </sup>
                      <sup className="sup" id="">
                        {" "}
                        <a href="/" id="fahrenheit-link">
                          °F
                        </a>
                      </sup>
                    </h1>
                  </div>
                </div>
              </div>

              <div className="col-6 text-center">
                <h3 className="high-and-low">
                  <em>
                    H: {weatherData.temp_max} <span id="temp_max"></span>ºC L: {weatherData.temp_min}
                    <span id="temp_min"></span>ºC
                  </em>
                </h3>

                <div className="col-6">
                  <h3 id="humidity-element">
                    Humidity: {weatherData.humidity} <span id="humidity">
                      </span>%
                  </h3>
                  <h3 id="wind-element"> 
                  Wind: {weatherData.wind} <span id="wind"></span> km/h
                  </h3>
                </div>
              </div>
              <hr />

              <div
                className="row row-cols-1 row-cols-sm-2 row-cols-md-4"
                id="forecast"
              ></div>
              <div className="row Forecast" id="forecast">
                <div className="col-2 text-center">
                  <div className="forecast">
                    <img 
                    src={weatherData.iconUrl}
                    alt={weatherData.description}
                    className= "float-left"
                    />
                    <p>
                      <strong>
                        Tuesday <br />
                      </strong>
                      22º
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} else {
  search();
  return (
      <Loader
        type="Hearts"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} 
      />
    );
}
}

