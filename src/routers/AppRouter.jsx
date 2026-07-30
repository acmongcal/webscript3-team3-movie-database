// AppRouter
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components

// Pages
import PageAbout from '../pages/PageAbout';
import PageDetails from '../pages/PageDetails';
import PageFavorites from '../pages/PageFavorites';
import PageHome from '../pages/PageHome';
import PageNotFound from '../pages/PageNotFound';

function AppRouter() {
  return (
    <BrowserRouter>
        <div className="wrapper">
            <main>
                <Routes>
                    <Route path="/" element={<PageHome />} />
                    <Route path="/about" exact element={<PageAbout />} />
                    <Route path="/movie-details/:id" element={<PageDetails />} />
                    <Route path="/favorites" element={<PageFavorites />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
        </div>
    </BrowserRouter>
  );
}

export default AppRouter;