import React from "react";
import "./style.css";

export default function Form() {
  return (
    <div className="form">
      <input
        type="submit"
        value="GO"
        id="searchForm"
        class="go"
        autofocus=" on"
        placeholder="GO"
        autocomplte="off"
      />
      <div className="current-location-button">
        <input
          type="submit"
          value="Current"
          id="weatherInfo"
          class="description"
          autofocus=" on"
          placeholder="GO"
          autocomplte="off"
        />
      </div>
    </div>
  );
}
