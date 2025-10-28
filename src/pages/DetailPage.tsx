
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { City } from '../types';
import Card from '../components/ui/Card';
import WeatherIcon from '../components/WeatherIcon';
import { WEATHER_CODES } from '../constants';
import { ArrowLeft, Thermometer } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DetailPageProps {
  selectedCity: City | null;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/70 dark:bg-black/70 p-2 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
        <p className="label text-sm font-bold">{`${label}`}</p>
        <p className="intro text-xs text-primary-600 dark:text-primary-400">{`Temp: ${payload[0].value}°C`}</p>
        <p className="desc text-xs">{`Precip: ${payload[0].payload.precipProb}%`}</p>
      </div>
    );
  }
  return null;
};

const DetailPage: React.FC<DetailPageProps> = ({ selectedCity }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dayData, hourlyForDay } = location.state || {};

  if (!dayData || !hourlyForDay || !selectedCity) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-xl font-semibold mb-4 text-red-500">Oops! Weather data not found.</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This can happen if you refresh the page or navigate here directly.
        </p>
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border bg-primary-500 text-white hover:bg-primary-600">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    );
  }

  const weatherInfo = WEATHER_CODES[dayData.weatherCode] || WEATHER_CODES[0];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Go back">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{selectedCity.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">{dayData.date}</p>
        </div>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center">
            <WeatherIcon code={dayData.weatherCode} className="h-14 w-14 sm:h-16 sm:w-16 text-primary-500" showDescription={false} />
            <div className="ml-4">
              <p className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white">{Math.round(dayData.tempMax)}°<span className="text-2xl sm:text-3xl text-gray-400 dark:text-gray-500">/{Math.round(dayData.tempMin)}°</span></p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{weatherInfo.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 sm:mt-0 text-sm">
            <div className="flex items-center">
                <Thermometer className="h-5 w-5 text-primary-500 mr-2" />
                <span>High: {Math.round(dayData.tempMax)}°C</span>
            </div>
            <div className="flex items-center">
                <Thermometer className="h-5 w-5 text-blue-400 mr-2" />
                <span>Low: {Math.round(dayData.tempMin)}°C</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">24-Hour Details</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyForDay} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="currentColor" className="text-gray-500 dark:text-gray-400" />
              <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-gray-500 dark:text-gray-400" unit="°C" domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="temp" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTemp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

    </div>
  );
};

export default DetailPage;