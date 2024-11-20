import "./style.css";
import { format } from 'date-fns';

let img = document.querySelector('img');
img.style.display = "none";

let ronImg = document.getElementById("cris");

ronImg.style.display = "none";



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
    let conditionsGeneral = data.description;
    let min = today.tempmin;
    let max = today.tempmax;
    let icon = today.icon;

    return {location, today, temp, feelsLike, conditionsToday, conditionsGeneral, min, max, icon}
}



async function computeSearch() {
    let search = document.getElementById("search").value;
    let rawData = await getWeather(search);
    let filteredData = await extractInfo(rawData);

    let date = new Date();
    let polishedDate = format(date, 'EEEE, MMMM do yyyy');

    let emoji;

    if (filteredData.icon == 'rain') {
        emoji = '🌧️';
    }
    else if (filteredData.icon == 'snow') {
        emoji = '❄️';
    }
    else if (filteredData.icon == 'cloudy') {
        emoji = '☁️';
    }
    else {
        emoji = '☀️';
    }

    document.getElementById("date").textContent = `${polishedDate} in`;
    document.getElementById("location").textContent = `🛰️ ${filteredData.location}`;
    document.getElementById("temp").textContent = `${emoji} ${filteredData.temp} °C`;
    document.getElementById("conditionsToday").textContent = filteredData.conditionsToday;
    document.getElementById("conditionsGeneral").textContent = filteredData.conditionsGeneral;


    
    
    img.src = await getGif(filteredData.icon)
    img.style.display = "inline";
    


    if (search == 'madrid' || search == 'Madrid') {
        ronImg.src = '../ronaldo.gif';
        ronImg.style.display = "inline";
    }
    else if (search == 'barcelona' || search == 'Barcelona') {
        ronImg.src = '../calma.gif';
        ronImg.style.display = "inline";
    }
    else {
        ronImg.src = "#";
        ronImg.style.display = "none";
    }
    
    
}

async function getGif(icon) {
    if (icon == 'snow') {
        icon = 'snowfall';
    }
    let gifResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=eBxN7IaRvldhczffnOR98732m4CXxriX&s=${icon}`, {mode: 'cors'});
    let gifData = await gifResponse.json();
    return gifData.data.images.original.url;
}


document.getElementById("enter").addEventListener("click", computeSearch);



