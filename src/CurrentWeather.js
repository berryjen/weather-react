import React, { useState } from "react";
import "./style.css";

export default function CurrentWeather() {
  let [city, setCity] = useState("");
  let [message, setMessage] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setMessage(`It is currently 18°C in ${city}`);
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
                      Monday, 00:00
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