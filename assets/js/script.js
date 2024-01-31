//Added basic fetch for data from Mapping API
document.addEventListener('DOMContentLoaded', function () {

    const apiUrl = 'https://geocode.search.hereapi.com/v1/geocode';
    const apiKey = 'RQsjWkadZwLvAyUu3XQzmATwlTXAmVQFvpHX1xAHFXU';
    
    async function fetchData(location) {
        try {
            const response = await fetch(`${apiUrl}?q=${location}&limit=4&apiKey=${apiKey}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('Failed to fetch data. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    document.getElementById('searchButton').addEventListener('click', function () {
        const location = document.getElementById('locationInput').value;
        fetchData(location);
    });
});
