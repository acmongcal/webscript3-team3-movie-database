// React imports
import { useState, useEffect } from "react";
import { FavoritesContext } from "./FavoritesContext";

// Javascript imports
import { localFavorites } from "../global/globals";

export function FavoritesProvider({ children }) {
  // Load user from localStorage on mount
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem(localFavorites);
    if (favoritesFromStorage) {
      try {
        const tempFavorites = JSON.parse(favoritesFromStorage);
        if (Array.isArray(tempFavorites)) {
          setFavorites(tempFavorites);
        } else {
          localStorage.removeItem(localFavorites);
        }
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        localStorage.removeItem(localFavorites);
      }
    }
  }, []);

  const addToFavorites = (newFavorite) => {
    if (!newFavorite || !newFavorite.id) {
      return;
    }

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
    if (!movie || !movie.id) {
      return;
    }

    setFavorites(favorites.filter((m) => m.id !== movie.id));
    const favoritesForStorage = JSON.stringify(favorites.filter((m) => m.id !== movie.id));
    localStorage.setItem(localFavorites, favoritesForStorage);
  };

  const isMovieFavorite = (movie) => {
    if (!movie || !movie.id) {
      return false;
    }

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
