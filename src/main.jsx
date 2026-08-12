import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './routers/AppRouter.jsx';
import "./styles/styles.scss";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
