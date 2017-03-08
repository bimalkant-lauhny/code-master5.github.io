
var getWeatherButton = document.getElementsByClassName("get-weather")[0];

getWeatherButton.onclick = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.alert("Geolocation is not supported by this browser.");
    }
};

function showPosition(position) {
    getWeatherData(position.coords.latitude, position.coords.longitude);
}

function getWeatherData(lat, lon) {
    var OwmUrl = "http://api.openweathermap.org/data/2.5/weather?";
    var Aid = "&APPID=061f24cf3cde2f60644a8240302983f2";
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", OwmUrl + "lon=" + lon + "&" + "lat=" + lat + Aid);
    
    xhr.onload = function updateWeather() {
        var rec = JSON.parse(xhr.responseText);
        
        document.getElementsByClassName("header")[0].style.visibility = "hidden";
        document.getElementsByClassName("main")[0].style.visibility = "visible";
        var placeHolder = document.getElementsByClassName("place")[0];
        placeHolder.innerHTML = rec.name + ", " + rec.sys.country;
        
        var celsiusTemp = rec.main.temp - 273.15;
        var fahrehTemp = (celsiusTemp * 9) / 5 + 32;
        celsiusTemp = celsiusTemp.toFixed(2);
        fahrehTemp = fahrehTemp.toFixed(2);
        
        var tempHolder = document.getElementsByClassName("temp")[0];
        tempHolder.innerHTML = "Celsius: " + celsiusTemp + "<br />" + "Fahrenheit: " + fahrehTemp;
       
        var backIco = getContent(rec.weather[0].id);
        
        var weatherHolder = document.getElementsByClassName("weather")[0];
        weatherHolder.innerHTML = rec.weather[0].main + "<br/> (" + rec.weather[0].description + ")";
        
        var iconHolder = document.getElementsByClassName("weatIcon")[0];
        iconHolder.src = backIco[1];
        
        var outbox = document.getElementsByClassName("container")[0];
        outbox.style.background = "url(" + backIco[0] + ")";
        outbox.style.backgroundRepeat = "no-repeat";
        outbox.style.backgroundSize = "cover";
    };
    
    xhr.send();
}


function getContent (weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return weatherIcons["thunderstorm"];
    } else if (weatherId >= 300 && weatherId < 600) {
        return weatherIcons["rain"];
    } else if (weatherId >= 600 && weatherId < 700) {
        return weatherIcons["snow"];
    } else if (weatherId >= 700 && weatherId < 800) {
        return weatherIcons["atmosphere"];
    } else if (weatherId === 800) {
        return weatherIcons["clear"];
    } else if (weatherId >= 801 && weatherId < 900) {
        return weatherIcons["clouds"];
    } else if (weatherId >= 900 && weatherId < 951) {
        return weatherIcons["extreme"];
    } else if (weatherId >= 951 && weatherId < 957) {
        return weatherIcons["breeze"];
    } else {
        return weatherIcons["extreme"];
    }
};

var weatherIcons = {
    "thunderstorm": ["/images/weatherImages/thunderstorm.jpg", "/icons/weatherIcons/thunderstorm.png"],
    "rain": ["/images/weatherImages/rain.jpg", "/icons/weatherIcons/rain.png"],
    "snow": ["/images/weatherImages/snow.jpg", "/icons/weatherIcons/snow.png"],
    "atmosphere": ["/images/weatherImages/atmosphere.jpg", "/icons/weatherIcons/atmosphere.png"],
    "clouds": ["/images/weatherImages/clouds.jpg", "/icons/weatherIcons/clouds.png"],
    "clear": ["/images/weatherImages/clear.jpg", "/icons/weatherIcons/clear.png"],
    "extreme": ["/images/weatherImages/extreme.jpg", "/icons/weatherIcons/extreme.png"],
    "breeze": ["/images/weatherImages/breeze.jpg", "/icons/weatherIcons/breeze.png"]
};
