// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
// import styles from './App.module.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
//import { CookiesProvider } from 'react-cookie';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';


// 1. Find the root DOM element in index.html
const container = document.getElementById('root');

// Ensure the container exists
if (container) {
  // 2. Create a React root
  const root = createRoot(container);

  // 3. Render the application into the root
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
