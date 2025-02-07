const displayResults = (data) => {
    // Clear previous results
    const formResults = document.getElementById('results');
    formResults.innerHTML = ''; // Clear previous content

    // Create HTML to display the weather data and image
    formResults.innerHTML += `
        <div class="weather-info">
            <p>Temp: ${data.weather.temp}°C</p>
            <p>Description: ${data.weather.description}</p>
        </div>
        <div class="image-container">
            <img src="${data.image}" alt="Destination Image">
        </div>`;
}

export { displayResults };