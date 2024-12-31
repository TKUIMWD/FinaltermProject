import { createHashRouter } from "react-router";
import App from '../view/DWRP';

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
])