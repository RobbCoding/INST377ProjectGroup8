let map;
let markers = [];
const locations = [
    { lat: 40.712776, lng: -74.005974, title: 'New York' },
    { lat: 34.052235, lng: -118.243683, title: 'Los Angeles' },
    { lat: 41.878113, lng: -87.629799, title: 'Chicago' },
    // Add more locations as needed
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.774929, lng: -122.419418 },
        zoom: 5
    });

    // Add markers to the map
    locations.forEach(location => {
        let marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title
        });
        markers.push(marker);
    });
}

function searchLocation() {
    const input = document.getElementById('locationInput').value;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': input }, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            map.setZoom(10);  // Adjust zoom level as needed
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// Ensure the initMap function is accessible globally
window.initMap = initMap;
