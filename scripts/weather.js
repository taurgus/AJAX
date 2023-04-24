function getWeather(event) {
    event.preventDefault(); 

    //Muuttujat
    const apiKey = "5c69cea1adcc7b793afeaf500214c0c5"; //API key
    var weatherdata = "https://openweathermap.org/img/wn/10d@2x.png";
    const location = document.getElementById('location').value; 
    const xml = new XMLHttpRequest(); //Uusi xml haku

    xml.onreadystatechange = function() {
      if (xml.readyState === XMLHttpRequest.DONE) {       //Server responses
        if (xml.status === 200 && xml.readyState === 4) { //Jos haku onnistuu
          const weatherData = JSON.parse(xml.responseText); //
          const weatherInfo = document.getElementById('weather-info'); //Weather-infoon parsitaan JSON tiedot esille

          //Eri säätiedot identifierseillä
          weatherInfo.innerHTML = ` 
            <h2>Sää paikassa ${location}</h2>
            <p>Maa: ${weatherData.sys.country}</p>
            <p>Lämpötila: ${weatherData.main.temp}°C</p>
            <p>Kosteus: ${weatherData.main.humidity}%</p>
            <p>Tuulennopeus: ${weatherData.wind.speed} km/s</p>
            <p>Pilvisyys: ${weatherData.clouds.all}</p>
            <p>Taivas: ${weatherData.weather[0].description}</p>
            <p><img src="/icons/${weatherData.weather[0].icon}.png" alt="Icon not found"></p>  
            
          `; // Nollat korvataan APIn tiedolla, esim sää iconin numerokoodin tilalle oikea kuva
        } else if (this.readyState == 4 && this.status == 404) { //Jos kaupunkia ei löydy tai kirjoitettu väärin etc, niin ilmoitus
          alert("Kaupunkia ei löydy! " + this.readyState + "   " + this.status); //Server response koodit
          console.log(this.readyState);
          console.log(this.status);
          return;
        } 
      }
    }; //Seuraavassa kohdassa oli kaikkein suurin ongelma saada toimimaan, perkele
    xml.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=fi&appid=`+ apiKey); // Open Weatherin API avaimella toteutetaan haku
    xml.send();
  }
    
  document.getElementById('weather-form').addEventListener('submit', getWeather); //Haetaan elementtiin "weather-form" säätiedot.
  
