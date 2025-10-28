import React from 'react';
import { FormattedWeatherData } from '../types';
import Card from './ui/Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  hourlyData: FormattedWeatherData['hourly'];
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

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const chartData = hourlyData.slice(0, 12);

  return (
    <Card className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Hourly Forecast</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
      <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {chartData.map((hour, index) => (
          <div key={index} className="flex-shrink-0 w-20 flex flex-col items-center p-2 rounded-lg bg-gray-200/50 dark:bg-gray-700/50">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{hour.time}</p>
            <WeatherIcon code={hour.weatherCode} className="h-8 w-8 my-1 text-primary-500" showDescription={false} />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{Math.round(hour.temp)}°</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HourlyForecast;