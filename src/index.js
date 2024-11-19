import "./style.css";

async function getWeather() {
    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Barbados?unitGroup=metric&key=EKEGPD87NCELHDQ85EFL3CLDA&contentType=json", {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);

    const today = weatherData.days[0];
    
    document.getElementById("location").textContent = weatherData.resolvedAddress;
    document.getElementById("date").textContent = today.datetime;
    document.getElementById("conditions").textContent = today.conditions;
    document.getElementById("temperature").textContent = `${today.temp} °C`;
}    

getWeather();



