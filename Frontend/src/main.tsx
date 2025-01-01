import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import { RouterProvider, } from 'react-router/dom'
import { createBrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './view/Landing'
import DWRP from './view/DWRP'
import { DishWashersProvider } from './context/DishWashersContext'
import { UserProvider } from './context/UserContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/DWRP',
    element: <DWRP />,
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
)
