
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { City, FormattedWeatherData, WeatherData } from '../types';
import { getWeatherData } from '../services/weatherService';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import LoadingSpinner from '../components/LoadingSpinner';
import { Heart } from 'lucide-react';
import { FavoritesContext } from '../App';
import PrecipitationChart from '../components/PrecipitationChart';

interface HomePageProps {
  selectedCity: City | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
  geolocating: boolean;
  geoError: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ selectedCity, setSelectedCity, geolocating, geoError }) => {
  const [weather, setWeather] = useState<FormattedWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  const formatWeatherData = (data: WeatherData): FormattedWeatherData => {
    const { current, hourly, daily } = data;
    
    const formattedHourly = hourly.time.map((t, i) => ({
      isoTime: t,
      time: new Date(t).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      temp: hourly.temperature_2m[i],
      precipProb: hourly.precipitation_probability[i],
      weatherCode: hourly.weather_code[i]
    }));

    const formattedDaily = daily.time.map((t, i) => ({
      isoDate: t,
      date: new Date(t + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      day: new Date(t + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' }),
      shortDate: new Date(t + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weatherCode: daily.weather_code[i],
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
    }));

    return {
      current: {
        temp: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code
      },
      hourly: formattedHourly,
      daily: formattedDaily,
    };
  };

  const fetchWeather = useCallback(async (city: City) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const data = await getWeatherData(city.latitude, city.longitude);
      setWeather(formatWeatherData(data));
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    } else {
        setLoading(geolocating);
    }
  }, [selectedCity, fetchWeather, geolocating]);

  const handleFavoriteToggle = () => {
    if (!selectedCity) return;
    if (isFavorite(selectedCity.id)) {
      removeFavorite(selectedCity.id);
    } else {
      addFavorite(selectedCity);
    }
  };
  
  const isLoading = loading || geolocating;

  if (isLoading) {
    return <div className="flex-grow flex items-center justify-center"><LoadingSpinner /></div>;
  }
  
  if (error || geoError) {
      return <div className="flex-grow flex items-center justify-center text-red-500 p-4 text-center">{error || geoError}</div>
  }

  if (!weather || !selectedCity) {
    return <div className="flex-grow flex items-center justify-center text-gray-500 p-4 text-center">Please search for a city or enable location services.</div>;
  }

  return (
    <div className="flex-grow p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <button onClick={handleFavoriteToggle} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border bg-white/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700">
            <Heart className={`h-5 w-5 ${isFavorite(selectedCity.id) ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
            <span className="hidden sm:inline">{isFavorite(selectedCity.id) ? 'Favorited' : 'Add to Favorites'}</span>
        </button>
      </div>
      <CurrentWeather city={selectedCity} weather={weather.current} />
      <HourlyForecast hourlyData={weather.hourly} />
      <PrecipitationChart hourlyData={weather.hourly} />
      <DailyForecast dailyData={weather.daily} hourlyData={weather.hourly} city={selectedCity} />
    </div>
  );
};

export default HomePage;