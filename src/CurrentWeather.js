import React, { useState } from "react";
import axios from"axios";

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

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#cityInput");
  cityElement.innerHTML = cityInput.value;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature) *9 /5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusTemperature= null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let icon = document.querySelector("#icon");
let humidityElement =document.querySelector("#humidity");
let windElement= document.querySelector("#wind");

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML= null;
let forecast= null;
for (let index= 0; index < 6; index++) {
 forecast= response.data.list[index];
 forecastElement.innerHTML += 
  `<div class="col">
      <Strong>
      </Strong>
      <br />
      ${formatHours(forecast.dt * 1000)}
        <img 
            src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
            alt=""
        />
      <br />
    </div>` 
}

function searchCity(city) {
  let apiKey = "f080158c041532d07353f9c3c3fc3150";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#temp_min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#temp_max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".current-weather-condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML= response.data.main.humidity;
  document.querySelector("#wind").innerHTML= Math.round(response.data.wind.speed);
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature= response.data.main.temp;
  document.querySelector("#forecast").innerHTML= formatDate(response.data.dt*1000);
  const weatherId= String(response.data.weather[0].id)
  const snowPattern= /^6\d\d/
  const rainyPattern= /^5\d\d/
  const drizzlePattern= /^3\d\d/
  const sunnyPattern= /^800/
  const cloudyPattern= /^8(?!00)0\d/
  const thunderstorm= /^2\d\d/
  if (thunderstorm.test(weatherId)) {
    document.querySelector("iframe").setAttribute("src", "https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=EF5466&layout=&size=medium&type=tracks&id=555755&app_id=1")
  }
  if (cloudyPattern.test(weatherId)) {
    document.querySelector("iframe").setAttribute("src", "https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=EF5466&layout=&size=medium&type=tracks&id=2312047&app_id=1")
      }
  if (sunnyPattern.test(weatherId)) {
    document.querySelector("iframe").setAttribute("src", "https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=EF5466&layout=&size=medium&type=tracks&id=95604934&app_id=1")
      }
  if (drizzlePattern.test(weatherId)) {
    document.querySelector("iframe").setAttribute("src", "https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=EF5466&layout=&size=medium&type=tracks&id=3996200&app_id=1")
  }
  if (rainyPattern.test(weatherId)) {
    document.querySelector("iframe").setAttribute("src", "https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=EF5466&layout=&size=medium&type=tracks&id=2794654&app_id=1")
  }
  if (snowPattern.test(weatherId)) {
    document.querySelector("iframe").setAttribute("src", "https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=EF5466&layout=&size=medium&type=tracks&id=66479980&app_id=1")
  }
}

function searchLocation(position) {
  let apiKey = "f080158c041532d07353f9c3c3fc3150";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition); 
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

let unit = "metric";

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let currentWeatherButton = document.querySelector("#weatherInfo");
currentWeatherButton.addEventListener("submit", handleSubmit);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

export default function CurrentWeather() {
  let currentTime = new Date();
  let [city, setCity] = useState("");
  let [message, setMessage] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setMessage(`It is currently ${temperature} in ${city}`);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

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
                onChange={updateCity}
              />
            </form>
            <h2>{message}</h2>

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
                  Taipei city
                </h1>
                <h3 class>
                  <span className="current-weather-condition"></span>
                  <img src="" alt="" id="icon" class="float-left" />
                </h3>
                <div className="temp">
                  <div className="temp">
                    <h1 span className="temp">
                      <span id="temperature">18</span>
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
                    H: 19 <span id="temp_max"></span>ºC L: 18
                    <span id="temp_min"></span>ºC
                  </em>
                </h3>

                <div className="col-6">
                  <h3 id="humidity-element">
                    Humidity:72<span id="humidity"></span>%
                  </h3>
                  <h3 id="wind-element">
                    Wind:7<span id="wind"></span>km/h
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
                      src="https://www.iconsdb.com/icons/preview/tropical-blue/cloud-4-xxl.png"
                      className="icon"
                      alt="Forecast"
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
}

