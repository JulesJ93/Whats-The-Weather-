//api key used for this project from open weather\
var apikey ="400cea51515fe3ec6686bdc773f2593a"

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

//array for storing the previously searched cities
var searchHistory = [];

//this variable sets up the forecast for each day
var forecast={};