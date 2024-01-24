import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

const rootElement = document.getElementById('root') ?? document.body;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
