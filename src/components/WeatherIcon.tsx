
import React from 'react';
import { WEATHER_CODES } from '../constants';
import { Sun } from 'lucide-react';

interface WeatherIconProps {
  code: number;
  className?: string;
  showDescription?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, className = 'h-8 w-8', showDescription = true }) => {
  const weather = WEATHER_CODES[code] || { description: 'Clear sky', icon: Sun };
  const IconComponent = weather.icon;

  return (
    <div className="flex flex-col items-center">
      <IconComponent className={className} />
      {showDescription && <p className="text-xs text-center mt-1">{weather.description}</p>}
    </div>
  );
};

export default WeatherIcon;
