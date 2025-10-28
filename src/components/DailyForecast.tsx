
import React from 'react';
import { City, FormattedWeatherData } from '../types';
import Card from './ui/Card';
import WeatherIcon from './WeatherIcon';
import { Link } from 'react-router-dom';
import { WEATHER_CODES } from '../constants';

interface DailyForecastProps {
  dailyData: FormattedWeatherData['daily'];
  hourlyData: FormattedWeatherData['hourly'];
  city: City;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ dailyData, hourlyData, city }) => {
  return (
    <Card className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">7-Day Forecast</h3>
      <div className="space-y-3">
        {dailyData.map((day, index) => {
          const hourlyForDay = hourlyData.filter(h => h.isoTime.startsWith(day.isoDate));
          const weatherInfo = WEATHER_CODES[day.weatherCode] || WEATHER_CODES[0];
          return (
            <Link
              key={index}
              to={`/detail/${day.isoDate}`}
              state={{ dayData: day, hourlyForDay, city }}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4 p-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200 w-12">{day.day}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 w-12">{day.shortDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <WeatherIcon code={day.weatherCode} showDescription={false} className="h-7 w-7 text-primary-500" />
                <p className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">{weatherInfo.description}</p>
              </div>
              <div className="flex justify-end items-center gap-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(day.tempMin)}°
                </p>
                <div className="w-12 sm:w-16 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full">
                  <div 
                    className="h-1.5 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"
                  ></div>
                </div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {Math.round(day.tempMax)}°
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
};

export default DailyForecast;
