const apiKey = "";
// Aqui vai sua APIKEY
// Here's your APIKEY

window.addEventListener('load', () => {
 navigator.geolocation.getCurrentPosition((position) => {
    console.log(Math.abs(position.coords.latitude), Math.abs(position.coords.longitude));

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    openWeatherApiCoordinates(latitude, longitude);
  });  
});

let latitude, longitude;

const openWeatherApi = (query) => {

  if (query.length <= 0 || query === "") {
    errorLocal();
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&lang=pt_br&units=metric&APPID=${apiKey}`;

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
        const img = `${weather.icon}@2x.png`
        description.innerHTML = weather.description.toUpperCase();
      })
      console.log(json);
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

const openWeatherApiCoordinates = (lat, lon) => {

  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&&units=metric&appid=${apiKey}`;

  const title = document.getElementById('title');
  const details = document.getElementById('details');
  const otherDetails = document.getElementById('otherDetails');

  fetch(url).then(async (response) => {
    console.log(url);
    if (response.status === 401) {
      return Swal.fire('Oooops!', 'Você não adicionou uma APIKEY válida!', 'warning')
    }

    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const json = await response.json();
      title.innerHTML = json.name;
      details.innerHTML = `${parseInt(json.main.temp)}º`;
      otherDetails.innerHTML = `Sensação Térmica:${parseInt(json.main.feels_like)}º`;
    } else {
      return Swal.fire('Oooops!', 'Você não digitou nenhum local!', 'warning');
    }
  })
    .catch(function (error) {
      return Swal.fire('Oooops!', error.message, 'warning');
    });
}

const errorLocal = () => {
  return Swal.fire('Oooops!', 'Você não digitou nenhum local!', 'warning');
}




















