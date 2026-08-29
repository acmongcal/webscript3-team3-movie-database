// React imports
import { useEffect } from "react";

// Javascript imports
import { appTitle } from "../global/globals";

function PageNotFound() {
  useEffect(() => {
    document.title = `${appTitle} - Page Not Found`;
  }, []);
  return (
    <main className="movie-details-error" role="alert">
      <h1>Page Not Found</h1>
    </main>
  );
}

export default PageNotFound;
