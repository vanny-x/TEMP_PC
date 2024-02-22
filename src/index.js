import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App.js';

import './index.css';

ReactDOM.createRoot(document.getElementById('App')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)