//this are variables that I will call on as functions below.
var cityNameEl = document.querySelector("#name");
var curDateEl = document.querySelector("#date");
var curIconEl = document.querySelector("#icon");
var curTempEl = document.querySelector("#temp");
var curHumidityEl = document.querySelector("#humidity");
var curWindEl = document.querySelector("#wind");
var curUvEl = document.querySelector("#uv");
var searchInputEl = document.querySelector("#search-city");
var formEl = document.querySelector("#search-form");
var historyEl = document.querySelector("#history");
var clearBtnEl = document.querySelector("#clear-history");
var forecastEl = document.querySelector("#forecast-body");
var resultsContEl = document.querySelector("#results-container");
var forecastContEl = document.querySelector("#forecast-container");
var curStatsEl = document.querySelector("#current-stats");

//api key used for this project from open weather\
var apikey ="400cea51515fe3ec6686bdc773f2593a"

//array for storing the previously searched cities
var searchHistory = [];

//this variable sets up the forecast for each day
var forecast={};

//this variable is to set up current weather
var currentweather = {
    name: "",
    date: "",
    temp: "",
    humidity: "",
    wind: "",
    uv: "",
    uvAlert: "",
    icon: ""
}

var getWeather = function (city){

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=" + apiKey;
    var lat = "";
    var lon = "";
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                //console.log(data);
                currentWeather.name = data.name;
                currentWeather.date = moment().format("dddd, MMMM Do YYYY");
                currentWeather.temp = data.main.temp + " &#176F";
                currentWeather.humidity = data.main.humidity+"%";
                currentWeather.wind = data.wind.speed + " MPH";
                currentWeather.icon = data.weather[0].icon;
                lat = data.coord.lat;
                lon = data.coord.lon;

                var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat="+lat+"&lon="+lon;
                fetch(uvUrl)
                .then(function(uvResponse) {
                    if (uvResponse.ok) {
                        uvResponse.json().then(function(uvData) {
                            //console.log(uvData);
                            currentWeather.uv = uvData.value;
                            console.log("Current Weather data ", currentWeather); 
                            //displayWeather();
                            curStatsEl.style.display = "block";
                            forecastContEl.style.display = "block";
                            cityNameEl.innerHTML = currentWeather.name;
                            curDateEl.innerHTML = currentWeather.date;
                            curTempEl.innerHTML = currentWeather.temp;
                            curHumidityEl.innerHTML = currentWeather.humidity;
                            curWindEl.innerHTML = currentWeather.wind;
                            curUvEl.innerHTML = currentWeather.uv;
                            curIconEl.innerHTML = "<img src='https://openweathermap.org/img/wn/" + currentWeather.icon + "@2x.png'></img>";
                            uvCheck();                        
                            getForecast(city);
                        });
                    }
                    else {
                        curUvEl.innerHTML = "Error";
                        currentWeather.uv = "error";
                    }
                    
                });

            });
        } else {
            //alert ("Error: " + response.statusText);
            clearData();
            cityNameEl.innerHTML = "Error: " + response.status + " " + city + " " + response.statusText;


        }
    })
    .catch (function(error) {
        cityNameEl.innerHTML = error.message + " Please try again later.";
    })
}