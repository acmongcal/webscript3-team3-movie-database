import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { FavoritesContext } from "../context/FavoritesContext";

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
