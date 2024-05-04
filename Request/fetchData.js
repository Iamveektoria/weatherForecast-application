const axios = require("axios");

function getWeatherForecast(latitude, longitude) {
  return axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,cloud_cover,pressure_msl,surface_pressure`,
      {}
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

module.exports.getWeatherForecast = getWeatherForecast;
