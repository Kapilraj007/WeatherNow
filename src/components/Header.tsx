
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Sun, Moon, Search, Star, Info, MapPin, Home, MoreVertical } from 'lucide-react';
import { ThemeContext } from '../App';
import { NavLink, useNavigate } from 'react-router-dom';
import { searchCities } from '../services/weatherService';
import { City } from '../types';

interface HeaderProps {
  onCitySelect: (city: City) => void;
  onGeolocate: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCitySelect, onGeolocate }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const fetchCities = async () => {
        const cities = await searchCities(searchTerm);
        setResults(cities);
      };
      const debounce = setTimeout(fetchCities, 300);
      return () => clearTimeout(debounce);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleSelectCity = (city: City) => {
    onCitySelect(city);
    setSearchTerm('');
    setResults([]);
    setIsFocused(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-500 text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-2 sm:px-4 py-3 flex items-center justify-between gap-1 sm:gap-2">
        <NavLink to="/">
          <h1 className="text-lg sm:text-xl font-bold text-primary-600 dark:text-primary-400">WeatherNow</h1>
        </NavLink>
        
        <nav className="flex items-center gap-1 sm:gap-2">
          <div ref={searchContainerRef} className="relative w-28 sm:w-48">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="w-full pl-10 pr-4 py-2 rounded-full border bg-gray-100 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
            {isFocused && results.length > 0 && (
              <ul className="absolute mt-2 w-full bg-white dark:bg-gray-700 rounded-lg shadow-xl overflow-hidden z-10">
                {results.map((city) => (
                  <li
                    key={city.id}
                    onClick={() => handleSelectCity(city)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {city.name}, {city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <button
            onClick={onGeolocate}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Use current location"
          >
            <MapPin className="h-5 w-5" />
          </button>
        </nav>
        
        <div className="flex items-center gap-1">
          <div className="hidden sm:flex items-center gap-1 sm:gap-2">
            <NavLink to="/" className={navLinkClass}><Home className="h-5 w-5" /></NavLink>
            <NavLink to="/favorites" className={navLinkClass}><Star className="h-5 w-5" /></NavLink>
            <NavLink to="/about" className={navLinkClass}><Info className="h-5 w-5" /></NavLink>
          </div>
          
          <button
            onClick={toggleTheme}
            className="hidden sm:flex p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          
          {/* Mobile Menu Button and Dropdown */}
          <div ref={menuContainerRef} className="relative sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open menu"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl overflow-hidden z-10">
                <ul>
                  <li>
                    <NavLink to="/" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/favorites" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
                      <Star className="h-5 w-5" />
                      <span>Favorites</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => setIsMenuOpen(false)}>
                      <Info className="h-5 w-5" />
                      <span>About</span>
                    </NavLink>
                  </li>
                   <li>
                    <button
                      onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      <span>{theme === 'light' ? 'Dark Theme' : 'Light Theme'}</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
