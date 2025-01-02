import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DishWashersProvider } from './context/DishWashersContext';
import { UserProvider } from './context/UserContext';
import { router } from './router/router';
import { ReservationsProvider } from './context/ReservationsContext';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReservationsProvider>
      <UserProvider>
        <DishWashersProvider>
          <RouterProvider router={router} />
        </DishWashersProvider>
      </UserProvider>
    </ReservationsProvider>
  </StrictMode>,
);