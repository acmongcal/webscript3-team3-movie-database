import { useEffect } from "react";
import { appTitle } from "../global/globals";
function PageAbout() {
  useEffect(() => {
    document.title = `${appTitle} - About`;
  }, []);
  return (
    <section>
      <h2>About</h2>
    </section>
  );
}

export default PageAbout;
