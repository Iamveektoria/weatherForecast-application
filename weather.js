const readline = require("node:readline");
const { getWeatherForecast } = require("./Request/fetchData");
const { locations } = require("./location");

const { stdin: input, stdout: output } = require("node:process");

// Creating an interface for users to interact with
const rl = readline.createInterface({ input, output });

// Function to format time
function formatTime(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

async function main() {
  //while loop to keep app running
  let keepRunning = true;
  while (keepRunning) {
    const location = await new Promise((resolve) => {
      rl.question(
        "Enter a location or type 'exit' to close application: ",
        (input) => {
          resolve(input.trim().toUpperCase());
        }
      );
    });
    // Exit while loop when condition is met
    if (location === "EXIT") {
      keepRunning = false;
      continue;
    }

    // Runs and ends code if a location outside the Database is selected
    if (!(location in locations)) {
      console.log(`This weather app does not cover "${location}"`);
      continue;
    }

    const { latitude, longitude } = locations[location];

    console.log("Fetching Data...");
    const response = await getWeatherForecast(latitude, longitude);
    if (response) {
      // Display location information
      console.log(
        `Location: Latitude ${response.latitude}, Longitude ${response.longitude}`
      );
      console.log(`Elevation: ${response.elevation} meters above sea level`);

      // Display current weather information
      console.log(`Current Weather in ${location.toUpperCase()}:`);
      console.log(`Time: ${formatTime(response.current.time)}`);
      console.log(
        `Temperature: ${response.current.temperature_2m} ${response.current_units.temperature_2m}`
      );
      console.log(
        `Relative Humidity: ${response.current.relative_humidity_2m} ${response.current_units.relative_humidity_2m}`
      );
      console.log(
        `Apparent Temperature: ${response.current.apparent_temperature} ${response.current_units.apparent_temperature}`
      );
      console.log(
        `Rain: ${response.current.rain} ${response.current_units.rain}`
      );
      console.log(
        `Cloud Cover: ${response.current.cloud_cover} ${response.current_units.cloud_cover}`
      );
      console.log(
        `Pressure at Mean Sea Level: ${response.current.pressure_msl} ${response.current_units.pressure_msl}`
      );
      console.log(
        `Surface Pressure: ${response.current.surface_pressure} ${response.current_units.surface_pressure}`
      );
    }
  }
  rl.close();
}

main();
