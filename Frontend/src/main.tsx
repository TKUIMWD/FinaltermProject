import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './view/Landing';
import DWRP from './view/DWRP';
import CustomerService from './view/CustomerService';
import { DishWashersProvider } from './context/DishWashersContext';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './component/ProtectedRoute';
import UpdateUser from './view/UpdateUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/DWRP',
    element: <DWRP />,
  },
  {
    path: '/customer-service',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <CustomerService />
      </ProtectedRoute>
    ),
  },
  {
    path: '/updateUser',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <UpdateUser />
      </ProtectedRoute>
    ),
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <DishWashersProvider>
        <RouterProvider router={router} />
      </DishWashersProvider>
    </UserProvider>
  </StrictMode>,
);