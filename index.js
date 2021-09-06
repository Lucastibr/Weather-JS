const apiKey = "";
// Aqui vai sua APIKEY
// Here's your APIKEY

window.addEventListener('load', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(Math.abs(position.coords.latitude), Math.abs(position.coords.longitude));

        latitude = Math.abs(position.coords.latitude);
        longitude = Math.abs(position.coords.longitude);
      
        openWeatherApiCoordinates(latitude, longitude);
      });
});

let latitude, longitude;

const openWeatherApi = (query) => {

    if(query.length <= 0 || query === "") {
      errorLocal();
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${apiKey}`;

    const title = document.getElementById('title');
    const details = document.getElementById('details');
    const otherDetails = document.getElementById('otherDetails');

    fetch(url).then(async (response) => {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          const json = await response.json();
          if(response.status === 404){
            return Swal.fire('Oooops!', 'Cidade não encontrada!', 'warning');
          }
            title.innerHTML = json.name;
            details.innerHTML = `${parseInt(json.main.temp)}º`;
            otherDetails.innerHTML = `Sensação Térmica:${parseInt(json.main.feels_like)}º`
            console.log(json);
        } else {
          errorLocal();
        }
      })
      .catch(function(error) {
          if(error.message.includes("temp") || error.code === 404 ) {
            return Swal.fire('Oooops!', 'Cidade não encontrada!', 'warning');
          }
          errorLocal();
      });
}

const openModal = () => {
    var modal = new bootstrap.Modal(document.getElementById('newSearch'), {
        keyboard: false
      });

      modal.show();

}

const openWeatherApiCoordinates = (lat, lon) => {   

    const latitude = Math.abs(lat);
    const longitude = Math.abs(lon);

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    const title = document.getElementById('title');
    const details = document.getElementById('details');
    const otherDetails = document.getElementById('otherDetails');

    fetch(url).then(async (response) => {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          const json = await response.json();
            title.innerHTML = json.name;
            details.innerHTML = `${parseInt(json.main.temp)}º`;
            otherDetails.innerHTML = `Sensação Térmica:${parseInt(json.main.feels_like)}º`
            console.log(json);
        } else {
            return Swal.fire('Oooops!', 'Você não digitou nenhum local!', 'warning');
        }
      })
      .catch(function(error) {
        return Swal.fire('Oooops!', error.message, 'warning');
      });
}

const errorLocal = () => {
  return Swal.fire('Oooops!', 'Você não digitou nenhum local!', 'warning');
}




















