function bikeLocationsAPI() {
  return fetch("http://api.citybik.es/v2/networks").then((res) => res.json());
}

async function createMap() {
    bikeLocations = await bikeLocationsAPI();

    var map = L.map('map').setView([39.71, -97.44], 4.5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    console.log(bikeLocations.networks);

    bikeLocations.networks.forEach((bike) => {
      console.log(bike);
      var marker = L.marker([bike.location.latitude, bike.location.longitude]).addTo(map);
    });

}

function addBikes() {

  var inputValue1 = document.getElementById(lat);
  var inputValue2 = document.getElementById(long);

  console.log(inputValue2)
  console.log(inputValue1)
  var marker = L.marker([inputValue1, inputValue2]).addTo(map);

}

window.onload = createMap;
