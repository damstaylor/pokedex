import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.scss';
import PokemonDetails from './routes/PokemonDetails/PokemonDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "pokemon/:id",
        element: <PokemonDetails />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root') ?? document.body;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
