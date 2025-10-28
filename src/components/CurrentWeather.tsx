
import React from 'react';
import { City, FormattedWeatherData } from '../types';
import Card from './ui/Card';
import WeatherIcon from './WeatherIcon';
import { WEATHER_CODES } from '../constants';
import { Wind, Droplets, Smile } from 'lucide-react';

interface CurrentWeatherProps {
  city: City;
  weather: FormattedWeatherData['current'];
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city, weather }) => {
  const weatherInfo = WEATHER_CODES[weather.weatherCode] || WEATHER_CODES[0];

  return (
    <Card className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">{city.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">{city.admin1 ? `${city.admin1}, ` : ''}{city.country}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{weatherInfo.description}</p>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <WeatherIcon code={weather.weatherCode} className="h-14 w-14 sm:h-16 sm:w-16 text-primary-500" showDescription={false} />
          <p className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white ml-4">{Math.round(weather.temp)}°C</p>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center">
          <Smile className="h-5 w-5 text-primary-500 mr-2" />
          <div>
            <p className="text-gray-500 dark:text-gray-400">Feels Like</p>
            <p className="font-semibold text-gray-700 dark:text-gray-200">{Math.round(weather.feelsLike)}°C</p>
          </div>
        </div>
        <div className="flex items-center">
          <Wind className="h-5 w-5 text-primary-500 mr-2" />
          <div>
            <p className="text-gray-500 dark:text-gray-400">Wind</p>
            <p className="font-semibold text-gray-700 dark:text-gray-200">{weather.windSpeed.toFixed(1)} km/h</p>
          </div>
        </div>
        <div className="flex items-center">
          <Droplets className="h-5 w-5 text-primary-500 mr-2" />
          <div>
            <p className="text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="font-semibold text-gray-700 dark:text-gray-200">{weather.humidity}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
