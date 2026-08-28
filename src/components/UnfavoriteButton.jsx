// React imports
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

//Bootstrap component imports
import Button from "react-bootstrap/Button";

function UnfavoriteButton({ movie }) {
  const {removeFavorite} = useContext(FavoritesContext);
  return (
    <Button type="button" className="favorite-button" variant="danger" onClick=
      {() => removeFavorite(movie)}>
      X
    </Button>
  );
}

export default UnfavoriteButton;
