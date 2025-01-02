import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import { RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DishWashersProvider } from './context/DishWashersContext';
import { UserProvider } from './context/UserContext';
import { router } from './router/router';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <DishWashersProvider>
        <RouterProvider router={router} />
      </DishWashersProvider>
    </UserProvider>
  </StrictMode>,
);