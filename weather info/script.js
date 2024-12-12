console.log("script is attached");
let inputLatitude = document.getElementById("latitude");
let inputLongitude = document.getElementById("longitude");
let inputButton = document.getElementById("searchlocation");
let mainWeather = document.getElementById("mainweather");
let weatherLocation = document.getElementById("location");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windspeed");



async function getWeather() { //Get data from API //
    let url = "https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.209&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Asia%2FKolkata&start_date=2021-01-01&end_date=2021-12-31";

    let response = await fetch(url)
    let data = await response.json();
    console.log(data);

    weatherLocation.innerHTML = "";
    weatherLocation.innerHTML = data.timezone;
    mainWeather.innerHTML = "";
    mainWeather.innerHTML = `${data.current.apparent_temperature}${data.current_units.apparent_temperature
        } `;
    windSpeed.innerHTML = "";
    windSpeed.innerHTML = `<i class="fa-solid fa-wind"></i> ${data.current.wind_speed_10m}`;
    humidity.innerHTML = "";
    humidity.innerHTML = `  <i class="fa-solid fa-droplet"></i> ${data.current.relative_humidity_2m}%`;
    return
}


getWeather()



async function getWeatherOnClick() { // Get Weather of that particulat latitude & longitude //

    if (inputLatitude.value === "" && inputLongitude.value === "") {
        weatherLocation.innerHTML = "Please add latitude & longitude to get the weather forecast";
        return;

    } else if (isNaN(inputLatitude.value) || isNaN(inputLongitude.value)) {
        weatherLocation.innerHTML = "Invalid latitude or longitude";
        return;
    } else {
        let url = `https://api.open-meteo.com/v1/forecast?latitude=${inputLatitude.value}&longitude=${inputLongitude.value}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Asia%2FKolkata&start_date=2021-01-01&end_date=2021-12-31`;

        let response = await fetch(url)
        let data = await response.json();
        weatherLocation.innerHTML = "";
        weatherLocation.innerHTML = data.timezone;
        mainWeather.innerHTML = "";
        mainWeather.innerHTML = `${data.current.apparent_temperature}${data.current_units.apparent_temperature
            } `;
        windSpeed.innerHTML = "";
        windSpeed.innerHTML = ` Wind Speed <br> <i class="fa-solid fa-wind"></i> ${data.current.wind_speed_10m}km/h `;
        humidity.innerHTML = "";
        humidity.innerHTML = `  Humidity <br> <i class="fa-solid fa-droplet"></i> ${data.current.relative_humidity_2m}% `;

        saveData()
        return
    }
}


inputButton.addEventListener("click", () => { // get weather of this particular latitude & longitude //
    getWeatherOnClick()
})

function saveData() { // save data in the browser's local storage //
    localStorage.setItem("location", weatherLocation.innerHTML)
    localStorage.setItem("weather", mainWeather.innerHTML)
    localStorage.setItem("windSpeed", windSpeed.innerHTML)
    localStorage.setItem("humidity", humidity.innerHTML)
    localStorage.setItem("latitude", inputLatitude.value)
    localStorage.setItem("longitude", inputLongitude.value)

}

let getData = () => { //get data from local storage //
    inputLongitude.value = localStorage.getItem("longitude")
    inputLatitude.value = localStorage.getItem("latitude")
    weatherLocation.innerHTML = localStorage.getItem("location")
    mainWeather.innerHTML = localStorage.getItem("weather")
    windSpeed.innerHTML = localStorage.getItem("windSpeed")
    humidity.innerHTML = localStorage.getItem("humidity")
}

getData()