import "./style.css";

async function getWeather(city) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EKEGPD87NCELHDQ85EFL3CLDA&contentType=json`, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
}    

async function extractInfo(data) {
    let location = data.resolvedAddress;
    let today = data.days[0];
    let temp = today.temp;
    let feelsLike = today.feelslike;
    let desc = today.description
    let min = today.tempmin;
    let max = today.tempmax;

    return {location, today, temp, feelsLike, desc, min, max}
}

/* async function main() {
    let rawData = await getWeather();
    let filteredData = await extractInfo(rawData);
    console.log(`In ${filteredData.location}, today, ${filteredData.today.datetime}, it's currently ${filteredData.temp} °C, and feels like ${filteredData.feelsLike}.
    ${filteredData.desc} We'll see a low of ${filteredData.min} and a high of ${filteredData.max} in the warmest hours of the day.`);
} */

async function computeSearch() {
    let search = document.getElementById("search").value;
    let rawData = await getWeather(search);
    let filteredData = await extractInfo(rawData);

    document.getElementById("location").textContent = filteredData.location;
    document.getElementById("date").textContent = filteredData.today.datetime;
    document.getElementById("conditions").textContent = filteredData.desc;
    document.getElementById("temperature").textContent = filteredData.temp;
}

document.getElementById("enter").addEventListener("click", computeSearch);




