import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ErrorPage from './pages/ErrorPage'
import GestionUsuarios from './pages/GestionUsuarios'
// Crear el router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <ErrorPage />, 
  },
  {
    path: '/reports',
    element: <Reports />,
    errorElement: <ErrorPage />, 
  },
  {
    path: '/gestionusuarios',
    element: <GestionUsuarios />,
    errorElement: <ErrorPage />, 
  },
  {
    path: '*', 
    element: <ErrorPage />, // Página de error para rutas no encontradas
  },
]);

const App = () => {
  return (
    
        <RouterProvider router={router} />
  );
};

export default App;
