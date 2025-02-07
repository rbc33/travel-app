// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()

const WEATHER_API_KEY = process.env["WEATHER_API_KEY"]
const PIXABAY_API_KEY = process.env["PIXABAY_API_KEY"]

// Initialize the Express application
const app = express();

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Encapsulated function to scrape text from a URL
const getCoords = async (dest) => {
    try {
        console.log(`Fetching coord for location: ${dest}`);

        // Fetch the webpage data
        const { data } = await axios.get(`http://api.geonames.org/geoCodeAddressJSON?q=${dest}&username=rudacity`);

        // Use Cheerio to load the HTML and extract the text
        const coords = {
            "lat" : data.address.lat,
            "lng" : data.address.lng
        }
        console.log(`Extracted coords:\nlat: ${coords.lat}\nlng: ${coords.lng}`);
        return coords;
    } catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
}
const getWeather = async (coords) => {
    try {
        console.log(`Fetching weather for location: ${coords.lat}, ${coords.lng}`);

        // Fetch the webpage data
        const { data } = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${coords.lat}&lon=${coords.lng}&key=${WEATHER_API_KEY}`);

        
        const weather = {
            "temp" : data.data[0].temp,
            "description" : data.data[0].weather.description
        }
        console.log(`Extracted weather:\ntemp: ${weather.temp}\ndescription: ${weather.description}`);
        return weather;
    } catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
}
const getImage = async (dest) => {
    try {
        console.log(`Fetching image for location: ${dest}`);

        // Fetch the webpage data
        const { data } = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${dest}&image_type=photo`);

        
        const image = data.hits[0].webformatURL;
        console.log(`Extracted image:\n${image}`);
        return image;
    } catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
}
// Route to analyze text from a URL
app.post('/getData', async (req, res) => {
    const { formData } = req.body;

    try {
        // Step 1: Scrape text from the provided URL
        const coords = await getCoords(formData.dest);
        const weather = await getWeather(coords);
        const image = await getImage(formData.dest);
        const data = {
            "weather" : weather,
            "image" : image
        }
        return res.json(data);
       
    } catch (error) {
        console.error('Error during URL processing or API request:', error.message);
        return res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send("This is the server API page. You may access its services via the client app.");
});

// Start the server
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
