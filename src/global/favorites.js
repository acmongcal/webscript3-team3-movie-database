// Add a movie unless it is already saved.
export function addMovieToFavorites(favorites, movie) {
  const alreadyAdded = favorites.some((favorite) => favorite.id === movie.id);

  if (alreadyAdded) {
    return favorites;
  }

  return [...favorites, movie];
}

// Return a new array without the selected movie.
export function removeMovieFromFavorites(favorites, movieId) {
  return favorites.filter((movie) => movie.id !== movieId);
}

// Check whether one movie exists in the favorites array.
export function isMovieFavorite(favorites, movieId) {
  return favorites.some((movie) => movie.id === movieId);
}
