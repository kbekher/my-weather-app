function search(city) {
  let units = "metric";
  let apiKey = "06a31ed5347f5a7e50a317cf3977889d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

function showWeather(response) {
  console.log(response.data); //delete this
  let weatherIcon = document.querySelector("#weather-image");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  weatherIcon.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);

  document.querySelector(
    "#wind"
  ).innerHTML = `${response.data.wind.speed} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure} hPa`;

  document.querySelector("#celsius-scale").classList.remove("turned-off");
  document.querySelector("#fahrenheit-scale").classList.add("turned-off");
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

function toCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "21°";

  document.querySelector("#celsius-scale").classList.remove("turned-off");
  document.querySelector("#fahrenheit-scale").classList.add("turned-off");
}

function toFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "69°";

  document.querySelector("#fahrenheit-scale").classList.remove("turned-off");
  document.querySelector("#celsius-scale").classList.add("turned-off");
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "06a31ed5347f5a7e50a317cf3977889d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let date = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = displayDate(date);

let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");
celsiusLink.addEventListener("click", toCelsius);
fahrenheitLink.addEventListener("click", toFahrenheit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", getSubmit);

let currentLocationIcon = document.querySelector("#current-location-icon");
currentLocationIcon.addEventListener("click", showCurrentPosition);

search("Kyiv");
