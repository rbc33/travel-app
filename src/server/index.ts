import {Request, Response} from 'express';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import {
  getCoords,
  getWeather,
  getImage,
  getWikiData,
  // getLocations,
} from './apis';
// O alternativamente para dotenv:
// const dotenv = require('dotenv');

// ... resto del código

// Interfaces
type FormData = {
  dest: string;
  date: string;
};
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

// Initialize the Express application
const app = express();

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

// Route to analyze text from a URL
app.post(
  '/getData',
  async (req: Request<{}, {}, RequestBody>, res: Response) => {
    const {formData}: RequestBody = req.body;

    try {
      // Step 1: Scrape text from the provided URL
      const coords: Coords = await getCoords(formData.dest);
      const weather: Weather = await getWeather(coords);
      // const locations = await getLocations(coords);
      const image = await getImage(formData.dest);
      const wiki = await getWikiData(formData.dest);
      const data = {
            weather,
            image,
            wiki,
          };

      console.log('Wiki data:', wiki);
      return res.json(data);
    } catch (error) {
      console.error(
        'Error during URL processing or API request:',
        (error as ApiError).message,
      );
      return res.status(500).json({error: 'Failed to analyze the URL'});
    }
  },
);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send(
    'This is the server API page. You may access its services via the client app.',
  );
});

// Start the server
app.listen(8000, () => {
  console.log('Server running on port 8000');
});
