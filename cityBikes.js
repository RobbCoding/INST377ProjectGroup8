function createMap() {
    var map = L.map('map').setView([39.71, -97.44], 4.5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        // .toFixed() returns string, so ' * 1' is a trick to convert to number
        }

        Lat1 = getRandomInRange(30, 35, 3);
        Long1 = getRandomInRange(-90, -100, 3);
        var marker1 = L.marker([Lat1, Long1]).addTo(map);

        Lat2 = getRandomInRange(30, 35, 3);
        Long2 = getRandomInRange(-90, -100, 3);
        var marker2 = L.marker([Lat2, Long2]).addTo(map);

        Lat3 = getRandomInRange(30, 35, 3);
        Long3 = getRandomInRange(-90, -100, 3);
        var marker3 = L.marker([Lat3, Long3]).addTo(map);

}

window.onload = createMap;
