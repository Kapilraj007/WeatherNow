import { City, WeatherData } from '../types';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const REVERSE_GEOCODING_API_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export const searchCities = async (query: string): Promise<City[]> => {
  if (query.length < 2) return [];
  try {
    const response = await fetch(`${GEOCODING_API_URL}?name=${query}&count=5&language=en&format=json`);
    if (!response.ok) throw new Error('Failed to fetch cities');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching cities:", error);
    return [];
  }
};

export const reverseGeocode = async (latitude: number, longitude: number): Promise<City> => {
  try {
    const response = await fetch(`${REVERSE_GEOCODING_API_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    if (!response.ok) throw new Error('Failed to fetch location name');
    const data = await response.json();
    return {
      id: Date.now(), // No stable ID from this API, generate one.
      name: data.city || data.locality || 'Unknown Location',
      latitude,
      longitude,
      country: data.countryName || '',
      admin1: data.principalSubdivision || '',
    };
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    // Fallback city object
    return {
      id: Date.now(),
      name: 'Current Location',
      latitude,
      longitude,
      country: '',
    };
  }
};

export const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,precipitation_probability,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '7',
  });

  try {
    const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};