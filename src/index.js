// Date and Time
function showDate(currentInfo) {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hours = [
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];
  let hour = hours[now.getHours()];
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let meridiem = "am";
  if (hours <= [11]) {
  } else {
    meridiem = "pm";
  }

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  ul.innerHTML = `${hour}:${minutes} ${meridiem}
  <br />
  ${day} ${month} ${date}, ${year}`;
  setTimeout("showDate()", 1000);
}

let ul = document.querySelector("ul");
showDate();

// Display City
function showCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let searchInput = document.querySelector("#search-text-input");

  h1.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

//Real-Time Data Temperature
function showTemperature(response) {
  console.log(response);
  //showCity Call
  let h1 = document.querySelector("h1");
  let city = response.data.name;
  let currentTemp = document.querySelector("#current-temp");
  h1.innerHTML = city;

  FarenheitTemperature = response.data.main.temp;
  currentTemp.innerHTML = Math.round(FarenheitTemperature);

  //Weather Conditions
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let trueFeelElement = document.querySelector("#feels-like");
  let descriptionElement = document.querySelector("#weather-description");
  let weatherIconElement = document.querySelector("#weather-icon");

  humidityElement.innerHTML =
    `humidity: ` + Math.round(response.data.main.humidity) + `%`;
  windElement.innerHTML =
    `wind: ` + Math.round(response.data.wind.speed) + ` mph`;
  trueFeelElement.innerHTML =
    `TruFeel  ` + Math.round(response.data.main.feels_like) + `°F`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "f082d16967881db977592af7768cccb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

//Convert °C
function convertCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let farenheitTemperature = currentTemp.innerHTML;
  currentTemp.innerHTML = Math.round(((FarenheitTemperature - 32) * 5) / 9);

  farenheitConversion.classList.remove("select");
  celsiusConversion.classList.add("select");
}

let celsiusConversion = document.querySelector("#celsius");
celsiusConversion.addEventListener("click", convertCelsius);

//Convert °F
function convertfarenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(FarenheitTemperature);

  celsiusConversion.classList.remove("select");
  farenheitConversion.classList.add("select");
}

let farenheitConversion = document.querySelector("#farenheit");
farenheitConversion.addEventListener("click", convertfarenheit);

let farenheitTemperature = null;

searchCity("Italy");
