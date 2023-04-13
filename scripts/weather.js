function getWeather() {
    var city = document.getElementById("city").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            displayWeather(response);
        }
    };
    xhttp.open("GET", "http://api.weatherapi.com/v1/current.json?key=5c69cea1adcc7b793afeaf500214c0c5&q=" + city, true);
    xhttp.send();
}

function displayWeather(response) {
    var weatherDiv = document.getElementById("weather");
    var city = response.location.name;
    var temp = response.current.temp_c;
    var condition = response.current.condition.text;
    weatherDiv.innerHTML = "Tämänhetkinen lämpötila " + city + "ssa on: " + temp + " astetta, " + condition;
}

var submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    getWeather();
});