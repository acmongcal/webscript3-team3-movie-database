// AppRouter
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "../context/FavoritesProvider";
// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
// Pages
import PageAbout from "../pages/PageAbout";
import PageDetails from "../pages/PageDetails";
import PageFavorites from "../pages/PageFavorites";
import PageHome from "../pages/PageHome";
import PageNotFound from "../pages/PageNotFound";
import { APP_FOLDER_NAME } from "../global/globals";


function AppRouter() {
  return (
    <BrowserRouter basename={`/${APP_FOLDER_NAME}`}>
      <FavoritesProvider>
        <div className="wrapper">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<PageHome />} />
              <Route path="/about" element={<PageAbout />} />
              <Route path="/movie-details/:id" element={<PageDetails />} />
              <Route path="/favorites" element={<PageFavorites />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
