const apiKey = "";
// Aqui vai sua APIKEY
// Here's your APIKEY

window.addEventListener('load', () => {
 navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    openWeatherApi(null, latitude, longitude);
  });  
});

let latitude, longitude;

const openWeatherApi = (query, lat, lon) => {
  
  let url = "";

  if(query != null && (query.length <= 0 || query === "")) {
    errorLocal();
    return;
  }

  if(query === null){
    url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&&units=metric&appid=${apiKey}`;
  }
  else{
    url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&lang=pt_br&units=metric&APPID=${apiKey}`;
  }

  const title = document.getElementById('title');
  const details = document.getElementById('details');
  const otherDetails = document.getElementById('otherDetails');
  const description = document.getElementById('description');
  const image = document.getElementById('image');

  fetch(url).then(async (response) => {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const json = await response.json();
      if (response.status === 404) {
        return Swal.fire('Oooops!', 'Cidade não encontrada!', 'warning');
      }
      title.innerHTML = json.name;
      details.innerHTML = `${parseInt(json.main.temp)}º`;
      otherDetails.innerHTML = `Sensação Térmica : ${parseInt(json.main.feels_like)}º `;
      json.weather.forEach(weather => {
        console.log(weather);
        const img = `${weather.icon}@2x.png`
        description.innerHTML = weather.description.toUpperCase();
      })
    } else {
      errorLocal();
    }
  })
    .catch(function (error) {
      if (error.message.includes("temp") || error.code === 404) {
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

const errorLocal = () => Swal.fire('Oooops!', 'Você não digitou nenhuma cidade!', 'warning');




















