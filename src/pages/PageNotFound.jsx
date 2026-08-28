// React imports
import { useEffect } from "react";

// Javascript imports
import { appTitle } from "../global/globals";

function PageNotFound() {
  useEffect(() => {
    document.title = `${appTitle} - Page Not Found`;
  }, []);
  return (
    <section className="page-content" >
      <h2>Page Not Found</h2>
    </section>
  );
}

export default PageNotFound;
