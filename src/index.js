function search(city) {
  let units = "metric";
  let apiKey = "06a31ed5347f5a7e50a317cf3977889d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

function displayWeather(response) {
  let date = new Date();
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = displayDate(date);

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");

  let weatherIcon = document.querySelector("#weather-image");

  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  descriptionElement.innerHTML = response.data.weather[0].main;

  weatherIcon.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);

  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  pressureElement.innerHTML = `${response.data.main.pressure} hPa`;

  document.querySelector("#celsius-scale").classList.remove("turned-off");
  document.querySelector("#fahrenheit-scale").classList.add("turned-off");

  document.querySelector("#search-input").value = "";

  displayForecast();
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let forecastHTML = `<div class="forecast-wrap">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
          <div class="week-day">
            <div class="text-section">
              <span class="day">${day}</span>
              <span class="date"> 15/07</span>
              <div class="temp">21°C</div>
            </div>
            <div class="image-section">
              <img
                src="img/rainy.png"
                alt="weather-icon"
                class="weather-image"
              />
            </div>
          </div>
      `;
  });
  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "06a31ed5347f5a7e50a317cf3977889d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(fahrenheitTemperature)}°`;

  document.querySelector("#fahrenheit-scale").classList.remove("turned-off");
  document.querySelector("#celsius-scale").classList.add("turned-off");
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(celsiusTemperature)}°`;

  document.querySelector("#celsius-scale").classList.remove("turned-off");
  document.querySelector("#fahrenheit-scale").classList.add("turned-off");
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getSubmit);

let currentLocationIcon = document.querySelector("#current-location-icon");
currentLocationIcon.addEventListener("click", getGeolocation);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

search("Kyiv");
