function getWeather(event) {
    event.preventDefault(); // Estää defaultin
    
    const location = document.getElementById('location').value;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) { //Jos haku onnistuu
          const weatherData = JSON.parse(xhr.responseText); //
          const weatherInfo = document.getElementById('weather-info'); //Weather-infoon parsitaan JSON tiedot esille
          weatherInfo.innerHTML = `
            <h2>Sää paikassa ${location}</h2>
            <p>Lämpötila: ${weatherData.main.temp}°C</p>
            <p>Kosteus: ${weatherData.main.humidity}%</p>
            <p>Taivas: ${weatherData.weather[0].description}</p>
          `;
        } 
      }
    };
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5c69cea1adcc7b793afeaf500214c0c5&units=metric`); // Open Weatherin API avaimella toteutetaan haku
    xhr.send();
  }
  
  document.getElementById('weather-form').addEventListener('submit', getWeather);
  