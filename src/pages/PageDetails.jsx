import { useEffect } from "react";
import { appTitle } from "../global/globals";
function PageDetails() {
  useEffect(() => {
    document.title = `${appTitle} - Details`;
  }, []);
  return (
    <section>
      <h2>Movie Details</h2>
    </section>
  );
}

export default PageDetails;
