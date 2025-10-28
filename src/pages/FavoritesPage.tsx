
import React, { useContext } from 'react';
import { FavoritesContext } from '../App';
import { City } from '../types';
import Card from '../components/ui/Card';
import { MapPin, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FavoritesPageProps {
  onSelectFavorite: (city: City) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onSelectFavorite }) => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const handleSelect = (city: City) => {
    onSelectFavorite(city);
    navigate('/');
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Favorite Cities</h1>
      {favorites.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400">You haven't added any favorite cities yet. Search for a city on the main page and click the heart icon to save it!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((city) => (
            <Card key={city.id} className="flex items-center justify-between transition-transform hover:scale-105">
              <div className="cursor-pointer flex-grow" onClick={() => handleSelect(city)}>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{city.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{city.country}</p>
              </div>
              <button
                onClick={() => removeFavorite(city.id)}
                className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500"
                aria-label={`Remove ${city.name} from favorites`}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
