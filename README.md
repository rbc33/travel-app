# Example Project

This project is a web application that interacts with various APIs to provide weather, image, and location data based on user input. It is built using TypeScript, Express, and Webpack, and it includes both client-side and server-side components.

## Features

* Weather Information: Fetches current weather data for a specified destination using the Weatherbit API.
* Image Retrieval: Retrieves an image related to the destination from the Pixabay API.
* Location Points of Interest: Uses the Amadeus API to find points of interest near the destination.
* Wikipedia Data: Fetches a brief extract from Wikipedia about the destination.
* Progressive Web Application: Configured with Webpack and Workbox for offline capabilities.

## Setup and Installation

### Clone the Repository:

### Install Dependencies:

npm install

### Set Environment Variables:
change the api keys in the /server/api.ts file:
```bash
const WEATHER_API_KEY = process.env['WEATHER_API_KEY'];
const PIXABAY_API_KEY = process.env['PIXABAY_API_KEY'];
```
with 
```bash
const WEATHER_API_KEY = "your_weather_api_key";
const PIXABAY_API_KEY = "your_pixabay_api_key";
```
or create an .env file with the following keys:
```bash
WEATHER_API_KEY="your_weather_api_key"
PIXABAY_API_KEY="your_pixabay_api_key"
````

### Build the Project:

For development:

npm run build-dev

For production:

npm run build-prod

### Start the Server:

npm start

### Run Tests:

npm test

## Usage

* Start the fontednd dev aplication in the 4000 port use: 
```bash 

npm run build-dev
``` 
* for starting the production mode run:
```bash
rm -rf dist
npm i -g http-server
npm run build-prod
cd dist && http-server
```

* Navigate to http://localhost:4000 in your browser.
* Enter a destination and date in the form provided.
* Submit the form to receive weather, image, and location data.

## API Integration

* Weatherbit API: Provides current weather data.
* Pixabay API: Supplies images related to the destination.
* Amadeus API: Offers points of interest near the destination.
* Wikipedia API: Fetches a brief description of the destination.

## Development

* TypeScript: Used for type safety and modern JavaScript features.
* Express: Handles server-side logic and API requests.
* Webpack: Bundles client-side assets and manages development and production builds.
* Jest: Used for testing the application.

## System Requirements

* Node version: v23.7.0