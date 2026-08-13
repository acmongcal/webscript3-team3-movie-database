// Add to favorites
export function addMovieToFavorites(favorites, movie) {
  const alreadyAdded = favorites.some((favorite) => favorite.id === movie.id);

  if (alreadyAdded) {
    return favorites;
  }

  return [...favorites, movie];
}

// Remove movie from favorites
export function removeMovieFromFavorites(favorites, movieId) {
  return favorites.filter((movie) => movie.id !== movieId);
}
