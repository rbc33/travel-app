import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
const WEATHER_API_KEY = process.env['WEATHER_API_KEY'];
const PIXABAY_API_KEY = process.env['PIXABAY_API_KEY'];
export const getCoords = async (dest) => {
    try {
        console.log(`Fetching coord for location: ${dest}`);
        // Fetch the webpage data
        const { data } = await axios.get(`http://api.geonames.org/geoCodeAddressJSON?q=${dest}&username=rudacity`);
        // Use Cheerio to load the HTML and extract the text
        const coords = {
            lat: data.address.lat,
            lng: data.address.lng,
        };
        console.log(`Extracted coords:\nlat: ${coords.lat}\nlng: ${coords.lng}`);
        return coords;
    }
    catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
};
export const getWeather = async (coords) => {
    try {
        console.log(`Fetching weather for location: ${coords.lat}, ${coords.lng}`);
        // Fetch the webpage data
        const { data } = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${coords.lat}&lon=${coords.lng}&key=${WEATHER_API_KEY}`);
        const weather = {
            temp: data.data[0].temp,
            description: data.data[0].weather.description,
        };
        console.log(`Extracted weather:\ntemp: ${weather.temp}\ndescription: ${weather.description}`);
        return weather;
    }
    catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
};
export const getImage = async (dest) => {
    try {
        console.log(`Fetching image for location: ${dest}`);
        // Fetch the webpage data
        const { data } = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${dest}&image_type=photo`);
        const image = data.hits[0].webformatURL;
        console.log(`Extracted image:\n${image}`);
        return image;
    }
    catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
};
export const getWikiData = async (dest) => {
    try {
        console.log(`Fetching image for location: ${dest}`);
        // Fetch the webpage data
        const { data } = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&redirects&titles=${dest}`);
        const pageId = Object.keys(data.query.pages)[0];
        const wiki = data.query.pages[pageId].extract;
        // console.log(`Extracted Wiki:\n${wiki}`);
        return wiki;
    }
    catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
};
//# sourceMappingURL=apis.js.map