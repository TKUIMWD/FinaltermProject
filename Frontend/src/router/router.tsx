import { createBrowserRouter } from "react-router";
import CustomerService from "../view/CustomerService";
import DWRP from "../view/DWRP";
import Landing from "../view/Landing";
import UpdateUser from "../view/UpdateUser";
import ProtectedRoute from "./ProtectedRoute";
import Reservations from "../view/Reservations";
import AddReservation from "../view/AddReservation";
import ReservationsManagement from "../view/ReservationsManagement";

export const router = createBrowserRouter([
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
    },
    {
        path: '/reservations',
        element: (
            <ProtectedRoute allowedRoles={['user']}>
                <Reservations/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/add-reservation',
        element: (
            <ProtectedRoute allowedRoles={['user']}>
                <AddReservation />
            </ProtectedRoute>
        ),
    },
    {
        path: '/reservations-management',
        element: (
            <ProtectedRoute allowedRoles={['admin']}>
                <ReservationsManagement />
            </ProtectedRoute>
        ),
    },
]);