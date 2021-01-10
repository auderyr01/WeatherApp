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
}

let ul = document.querySelector("ul");
showDate(ul);

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
  h1.innerHTML = city;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  //Weather Conditions
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML =
    `humidity: ` + Math.round(response.data.main.humidity) + `%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `wind: ` + Math.round(response.data.wind.speed) + ` mph`;
  let trueFeel = document.querySelector("#feels-like");
  trueFeel.innerHTML =
    `TruFeel  ` + Math.round(response.data.main.feels_like) + `°F`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
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
  let farenheit = currentTemp.innerHTML;
  currentTemp.innerHTML = Math.round(((farenheit - 32) * 5) / 9);
}

let celsiusConversion = document.querySelector("#celsius");
celsiusConversion.addEventListener("click", convertCelsius);

//Convert °F
function convertfarenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let celsius = currentTemp.innerHTML;
  currentTemp.innerHTML = Math.round(celsius * 1.8 + 32);
}

let farenheitConversion = document.querySelector("#farenheit");
farenheitConversion.addEventListener("click", convertfarenheit);

searchCity("Italy");
