import { useEffect } from "react";
import { appTitle } from "../global/globals";
function PageNotFound() {
  useEffect(() => {
    document.title = `${appTitle} - Page Not Found`;
  }, []);
  return (
    <section>
      <h2>Page Not Found</h2>
    </section>
  );
}

export default PageNotFound;
