import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <BrowserRouter basename={process.env.MODE === 'gh-pages' ? `/${process.env.REPO_NAME}` : ""}>
    <React.StrictMode><App /></React.StrictMode>
  </BrowserRouter>
);

serviceWorkerRegistration.register();
