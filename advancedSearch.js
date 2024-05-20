function toggleBookmark(cityName) {
    const bookmarkedCities = JSON.parse(localStorage.getItem('bookmarkedCities')) || [];
    const index = bookmarkedCities.indexOf(cityName);
    if (index === -1) {
        bookmarkedCities.push(cityName);
    } else {
        bookmarkedCities.splice(index, 1);
    }
    localStorage.setItem('bookmarkedCities', JSON.stringify(bookmarkedCities));
    fetchBookmarks();
}

function fetchBookmarks() {
    const bookmarksList = document.getElementById('bookmarks-list');
    bookmarksList.innerHTML = '';
    const bookmarkedCities = JSON.parse(localStorage.getItem('bookmarkedCities')) || [];
    bookmarkedCities.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        bookmarksList.appendChild(listItem);
    });
}

function fetchCities() {
    fetch('https://api.citybik.es/v2/networks')
        .then(response => response.json())
        .then(data => {
            const usCities = data.networks.filter(network => network.location.country === 'US');
            const nonUsCities = data.networks.filter(network => network.location.country !== 'US');
            const createCityList = (cities, listId) => {
                const citiesList = document.getElementById(listId);
                citiesList.innerHTML = '';
                cities.forEach(city => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${city.location.city}, ${city.location.country}`;
                    const bookmarkButton = document.createElement('button');
                    bookmarkButton.textContent = 'Bookmark';
                    bookmarkButton.addEventListener('click', () => toggleBookmark(`${city.location.city}, ${city.location.country}`));
                    listItem.appendChild(bookmarkButton);
                    citiesList.appendChild(listItem);
                });
            };
            createCityList(usCities, 'us-cities-list');
            createCityList(nonUsCities, 'non-us-cities-list');
        })
        .catch(error => {
            console.error('Error fetching cities data:', error);
        });
}

fetchCities();

fetch('https://api.citybik.es/v2/networks/bikemi')
    .then(response => response.json())
    .then(data => {
        const networkInfoContainer = document.getElementById('network-info-container');
        ['name', 'location', 'description'].forEach(property => {
            const networkProperty = document.createElement('p');
            networkProperty.textContent = `${property.charAt(0).toUpperCase() + property.slice(1)}: ${data.network[property]}`;
            networkInfoContainer.appendChild(networkProperty);
        });
    })
    .catch(error => {
        console.error('Error fetching network data:', error);
    });

