"use strict";

const weatherForm = document.querySelector(".weatherForm");
const cityDisplayElement = document.querySelector("body");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const myApiKey = "754c9447b746957ee789126a9a9a49f0";
let backgroundChanger = "";
// let forecastDiv = document.querySelector(".forecast")

const thunderstorm = `<i class="fa-solid fa-cloud-bolt"></i>`;
const rain = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
const snow = `<i class="fa-solid fa-snowflake"></i>`;
const clear = `<i class="fa-solid fa-sun"></i>`;
const clouds = `<i class="fa-solid fa-cloud"></i>`;
const fog = `<i class="fa-solid fa-smog"></i>`;
const mist = `<i class="fa-solid fa-smog"></i>`;
const drizzle = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
const atmosphere = `<i class="fa-solid fa-cloud"></i>`;
const unknown = `<i class="fa-solid fa-question"></i>`;

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeaterInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

const getWeatherData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}`;

  const response = await fetch(apiUrl);
  console.log(response);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
};
const getForecastData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myApiKey}`;

  const response = await fetch(apiUrl);
  console.log(response);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
};

const displayWeaterInfo = (data) => {
  console.log(data);

  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");
  const forecastDiv = document.createElement("div");

  for (let i = 0; i < 4; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = `${new Date().getDate() + 1 + i} ${data.weatherEmoji}`;
    forecastDiv.appendChild(day);
    console.log(getForecastData(city));
  }

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  forecastDiv.classList.add("forecast");
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
  card.appendChild(forecastDiv);
};

const getWeatherEmoji = (weatherId) => {
  if (weatherId >= 200 && weatherId <= 232) {
    // Group 2xx: Thunderstorm
    return "⛈";
  } else if (weatherId >= 300 && weatherId <= 321) {
    // Group 3xx: Drizzle

    return "🌦️";
  } else if (weatherId >= 500 && weatherId <= 531) {
    // Group 5xx: Rain
    return "🌧️";
  } else if (weatherId >= 600 && weatherId <= 622) {
    // Group 6xx: Snow
    return "❄️";
  } else if (weatherId >= 701 && weatherId <= 781) {
    // Group 7xx: Atmosphere
    return "☁️";
  } else if (weatherId === 800) {
    // Group 800: Clear
    return "☀️";
  } else if (weatherId >= 801 && weatherId <= 804) {
    // Group 8xx: Undefined
    return "🤫";
  }
};

const displayError = (message) => {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
};

const getImgData = async (city) => {
  // Fetch image URL using the Unsplash API
  const pictureUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=-xDbqbjONob5D_G8EjasuYzYks0IQxP-rvpQ9ubd6ko`;
  const response = await fetch(pictureUrl);
  if (!response.ok) {
    throw new Error("Could not fetch image URL");
  }
  const data = await response.json();
  console.log(data);
  const imageUrl = data.results[0].urls.regular;
  console.log(imageUrl);
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  return data;
};

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      await getImgData(city);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

// const displayImage = async (city) => {
//   try {
//     const imgData = await getImgData(city);
//     // Display image data here
//   } catch (error) {
//     console.error("Error displaying image:", error);
//   }
// };
