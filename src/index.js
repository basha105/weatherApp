import "./style.css";

const days = ['Sunday, Monday, Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
    let conditionsToday = today.description
    let conditionsGeneral = data.conditions;
    let min = today.tempmin;
    let max = today.tempmax;
    let icon = today.icon;

    return {location, today, temp, feelsLike, conditionsToday, conditionsGeneral, min, max, icon}
}

async function computeSearch() {
    let search = document.getElementById("search").value;
    let rawData = await getWeather(search);
    let filteredData = await extractInfo(rawData);

    let dateData = new Date(`${filteredData.today.datetime}`);
    let formattedDate = dateData.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'});

    document.getElementById("location").textContent = `${filteredData.location} on ${formattedTime}`;
    document.getElementById("temp").textContent = `${filteredData.temp} °C`;
    document.getElementById("date").textContent = filteredData.today.datetime;
    document.getElementById("conditions").textContent = filteredData.desc;
    
}

document.getElementById("enter").addEventListener("click", computeSearch);




