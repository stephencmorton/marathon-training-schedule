import './index.css';
import App from './components/App';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

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
