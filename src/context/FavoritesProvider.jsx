import { useState, useEffect } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { localFavorites } from "../global/globals";

export function FavoritesProvider({ children }) {
  // Load user from localStorage on mount
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem(localFavorites);
    if (favoritesFromStorage) {
      try {
        const tempFavorites= JSON.parse(favoritesFromStorage);
        setFavorites(tempFavorites);
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        localStorage.removeItem(localFavorites);
      }
    }
  }, []);

  const addToFavorites = (newFavorite) => {
    const alreadyAdded = favorites.some(
      (favorite) => favorite.id === newFavorite.id,
    );
    if (!alreadyAdded) {
      setFavorites([...favorites, newFavorite]);
      const favoritesForStorage = JSON.stringify([...favorites, newFavorite]);
      localStorage.setItem(localFavorites, favoritesForStorage);
    }
  };

  const removeFavorite = (movie) => {
    setFavorites(favorites.filter((m) => m.id !== movie.id));
    const favoritesForStorage = JSON.stringify(favorites.filter((m) => m.id !== movie.id));
    localStorage.setItem(localFavorites, favoritesForStorage);
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
