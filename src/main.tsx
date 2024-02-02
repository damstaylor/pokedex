import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import App from './App';
import './index.scss';
import PokemonDetails from './routes/PokemonDetails/PokemonDetails';

library.add(faAngleLeft, faAngleRight);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/pokemon/:id",
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
