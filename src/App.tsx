import React, { useState, useEffect, createContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header';
import { Theme, ThemeContextType, City, FavoritesContextType } from './types';
import DetailPage from './pages/DetailPage';
import { reverseGeocode } from './services/weatherService';

export const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => {} });
export const FavoritesContext = createContext<FavoritesContextType>({ favorites: [], addFavorite: () => {}, removeFavorite: () => {}, isFavorite: () => false });

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [favorites, setFavorites] = useState<City[]>(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [geolocating, setGeolocating] = useState(true);
  const [geoError, setGeoError] = useState<string|null>(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const geolocate = () => {
    if (!navigator.geolocation) {
        setGeoError("Geolocation is not supported by your browser.");
        setGeolocating(false);
        return;
    }
    setGeolocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            const city = await reverseGeocode(latitude, longitude);
            setSelectedCity(city);
            setGeolocating(false);
        },
        () => {
            setGeoError("Unable to retrieve your location. Please grant permission or search for a city.");
            setGeolocating(false);
        }
    );
  };
  
  useEffect(() => {
    geolocate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addFavorite = (city: City) => {
    if (!favorites.some(fav => fav.id === city.id)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (cityId: number) => {
    setFavorites(favorites.filter((city) => city.id !== cityId));
  };
  
  const isFavorite = (cityId: number) => {
      return favorites.some(fav => fav.id === cityId);
  }

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
        <HashRouter>
          <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
             <Header onCitySelect={handleCitySelect} onGeolocate={geolocate} />
            <main className="container mx-auto flex-grow">
              <Routes>
                <Route path="/" element={<HomePage selectedCity={selectedCity} setSelectedCity={setSelectedCity} geolocating={geolocating} geoError={geoError}/>} />
                <Route path="/favorites" element={<FavoritesPage onSelectFavorite={handleCitySelect} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/detail/:isoDate" element={<DetailPage selectedCity={selectedCity} />} />
              </Routes>
            </main>
          </div>
        </HashRouter>
      </FavoritesContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;