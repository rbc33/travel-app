import {PostData} from './formHandler';
const displayResults = (data: PostData) => {
  // Clear previous results
  const formResults = document.getElementById('results') as HTMLElement;
  formResults.innerHTML = ''; // Clear previous content
    formResults.innerHTML += `
            <div class="weather-info">
            <p>Temp: ${data.weather.temp}°C</p>
            <p>Weather: ${data.weather.description}</p>
            <p id="wiki">Wiki data: ${data.wiki.slice(0, 200)}</p>
        </div>
        <div class="image-container">
            <img src="${data.image}" alt="Destination Image">
        </div>`;
    const wiki = document.getElementById('wiki');
    if (!wiki) return;
    wiki.addEventListener('click', () => {
      wiki.innerText.length <= 200
        ? (wiki.innerText = data.wiki!)
        : (wiki.innerText = data.wiki!.slice(0, 200));
    });
  if (data && !data.wiki) {
    // Create HTML to display the weather data and image
    formResults.innerHTML += `
        <div class="weather-info">
            <p>Temp: ${data.weather.temp}°C</p>
            <p>Weather: ${data.weather.description}</p>
        </div>
        <div class="image-container">
            <img src="${data.image}" alt="Destination Image">
        </div>`;
  }
};
export {displayResults};
