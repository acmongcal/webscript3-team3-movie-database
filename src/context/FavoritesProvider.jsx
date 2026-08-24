import { useState } from "react";
import { FavoritesContext } from "./FavoritesContext";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (newFavorite) => {
    const alreadyAdded = favorites.some(
      (favorite) => favorite.id === newFavorite.id,
    );
    if (!alreadyAdded) {
      setFavorites([...favorites, newFavorite]);
    }
  };

  const removeFavorite = (movie) => {
    setFavorites(favorites.filter((m) => m.id !== movie.id));
  };

  const isMovieFavorite = (movie) => {
    return favorites.some((m) => m.id === movie.id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFavorite,
        isMovieFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
