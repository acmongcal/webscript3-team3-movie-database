// React imports
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

// Bootstrap Components
import Button from "react-bootstrap/Button";

function FavoriteButton({ movie }) {
  const { addToFavorites } = useContext(FavoritesContext);
  return (
    <Button
      type="button"
      className="favorite-button"
      variant="outline-danger"
      onClick={() => addToFavorites(movie)}
    >
      &hearts;
    </Button>
  );
}

export default FavoriteButton;
