import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FavoritesContext, FAVORITES_STORAGE_KEY } from './favoritesContextValue';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo(() => ({
    favorites,
    isFavorite: (id) => favorites.includes(id),
    toggleFavorite: (id) =>
      setFavorites((curr) =>
        curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id],
      ),
    clearFavorites: () => setFavorites([]),
  }), [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
