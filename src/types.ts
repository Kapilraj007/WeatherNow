export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface FormattedWeatherData {
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
  };
  hourly: {
    isoTime: string;
    time: string;
    temp: number;
    precipProb: number;
    weatherCode: number;
  }[];
  daily: {
    isoDate: string;
    date: string;
    day: string;
    shortDate: string;
    weatherCode: number;
    tempMax: number;
    tempMin: number;
  }[];
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface FavoritesContextType {
  favorites: City[];
  addFavorite: (city: City) => void;
  removeFavorite: (cityId: number) => void;
  isFavorite: (cityId: number) => boolean;
}