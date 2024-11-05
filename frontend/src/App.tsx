import React from 'react';
import { Grid } from '@mui/material'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ErrorPage from './pages/ErrorPage'

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
    path: '*', 
    element: <ErrorPage />, // Página de error para rutas no encontradas
  },
]);

const App = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <RouterProvider router={router} />
      </Grid>
    </Grid>
  );
};

export default App;
