function bikeLocationsAPI() {
  return fetch("http://api.citybik.es/v2/networks").then((res) => res.json());
}

async function createMap() {
    bikeLocations = await bikeLocationsAPI();
    console.log(bikeLocations);

    var map = L.map('map').setView([39.71, -97.44], 4.5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    bikeLocations.forEach((bike) => {
      var marker = L.marker([bikeLocations.latitude, bikeLocations.longitude]).addTo(map);
    });

}

window.onload = createMap;
