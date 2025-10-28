import React from 'react';
import { FormattedWeatherData } from '../types';
import Card from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplets } from 'lucide-react';

interface PrecipitationChartProps {
  hourlyData: FormattedWeatherData['hourly'];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/70 dark:bg-black/70 p-2 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
        <p className="label text-sm font-bold">{`${label}`}</p>
        <p className="intro text-xs text-blue-600 dark:text-blue-400">{`Chance of Rain: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const PrecipitationChart: React.FC<PrecipitationChartProps> = ({ hourlyData }) => {
  const chartData = hourlyData.slice(0, 12);

  return (
    <Card className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center">
        <Droplets className="h-5 w-5 mr-2 text-blue-500" />
        Chance of Precipitation
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="currentColor" className="text-gray-500 dark:text-gray-400" />
            <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-gray-500 dark:text-gray-400" unit="%" domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }} />
            <Bar dataKey="precipProb" name="Precipitation Probability" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PrecipitationChart;
