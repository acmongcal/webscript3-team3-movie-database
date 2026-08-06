import { useEffect } from "react";
import { appTitle } from "../global/globals";
function PageFavorites() {
  useEffect(() => {
    document.title = `${appTitle} - Favorites`;
  }, []);
  return (
    <section>
      <h2>Favorites</h2>
    </section>
  );
}

export default PageFavorites;
