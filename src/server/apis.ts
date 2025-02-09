import axios from 'axios';
import querystring from 'querystring';
import * as dotenv from 'dotenv';
dotenv.config();

interface Coords {
  lat: number;
  lng: number;
}

interface Weather {
  temp: number;
  description: string;
}

interface RequestBody {
  formData: FormData;
}

interface ApiError {
  message: string;
}
interface WikiResponse {
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        title: string;
        extract: string;
      };
    };
  };
}
const WEATHER_API_KEY = process.env['WEATHER_API_KEY'];
const PIXABAY_API_KEY = process.env['PIXABAY_API_KEY'];

export const getCoords = async (dest: string): Promise<Coords> => {
  try {
    console.log(`Fetching coord for location: ${dest}`);

    // Fetch the webpage data
    const {data} = await axios.get(
      `http://api.geonames.org/geoCodeAddressJSON?q=${dest}&username=rudacity`,
    );

    // Use Cheerio to load the HTML and extract the text
    const coords = {
      lat: data.address.lat,
      lng: data.address.lng,
    };
    console.log(`Extracted coords:\nlat: ${coords.lat}\nlng: ${coords.lng}`);
    return coords;
  } catch (error) {
    console.error(
      'Error while scraping text from the URL:',
      (error as ApiError).message,
    );
    throw new Error('Failed to scrape text from the URL');
  }
};
export const getWeather = async (coords: Coords): Promise<Weather> => {
  try {
    console.log(`Fetching weather for location: ${coords.lat}, ${coords.lng}`);

    // Fetch the webpage data
    const {data} = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${coords.lat}&lon=${coords.lng}&key=${WEATHER_API_KEY}`,
    );

    const weather = {
      temp: data.data[0].temp,
      description: data.data[0].weather.description,
    };
    console.log(
      `Extracted weather:\ntemp: ${weather.temp}\ndescription: ${weather.description}`,
    );
    return weather;
  } catch (error: unknown) {
    console.error(
      'Error while scraping text from the URL:',
      (error as ApiError).message,
    );
    throw new Error('Failed to scrape text from the URL');
  }
};
export const getImage = async (dest: string) => {
  try {
    console.log(`Fetching image for location: ${dest}`);

    // Fetch the webpage data
    const {data} = await axios.get(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${dest}&image_type=photo`,
    );

    const image = data.hits[0].webformatURL;
    console.log(`Extracted image:\n${image}`);
    return image;
  } catch (error) {
    console.error(
      'Error while scraping text from the URL:',
      (error as ApiError).message,
    );
    throw new Error('Failed to scrape text from the URL');
  }
};
export const getWikiData = async (dest: string) => {
  try {
    console.log(`Fetching image for location: ${dest}`);

    // Fetch the webpage data
    const {data} = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&redirects&titles=${dest}`,
    );
    const pageId = Object.keys(data.query.pages)[0];
    const wiki = data.query.pages[pageId].extract;
    // console.log(`Extracted Wiki:\n${wiki}`);
    return wiki;
  } catch (error) {
    console.error(
      'Error while scraping text from the URL:',
      (error as ApiError).message,
    );
    throw new Error('Failed to scrape text from the URL');
  }
};
// Función para obtener el token de Amadeus
export const getAmadeusToken = async (): Promise<string> => {
  try {
    const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const response = await axios.post(
      url,
      querystring.stringify({
        grant_type: 'client_credentials',
        client_id: process.env['AMADEUS_CLIENT_ID'] as string,
        client_secret: process.env['AMADEUS_CLIENT_SECRET'] as string,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    console.log('Amadeus token:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Amadeus token:', error);
    throw new Error('Failed to get Amadeus token');
  }
};

// Encapsulated function to scrape text from a URL

export const getLocations = async (coord: Coords) => {
  try {
    console.log(`Fetching location for coords: ${coord.lat}, ${coord.lng}`);
    const url = `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${coord.lat}&longitude=${coord.lng}`;
    const amApiKey = await getAmadeusToken();
    const {data} = await axios.get(url, {
      headers: {Authorization: `Bearer ${amApiKey}`},
    });

    const locations: string[] = data.map((location: any) => location.name);
    console.log(`Extracted locations:\n${locations}`);
    return locations;
  } catch (error) {
    console.error(
      'Error while scraping text from the URL:',
      (error as ApiError).message,
    );
    return null;
  }
};
