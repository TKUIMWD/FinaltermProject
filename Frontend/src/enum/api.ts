import { AdminApiEndpoints, AuthApiEndpoints, CommonApiEndpoints, UserApiEndpoints } from "../interface/ApiEndPoints";

export const common_api: CommonApiEndpoints = {
    base: import.meta.env.VITE_COMMON_API_BASE_URL,
    getAllDishWashers: `${import.meta.env.VITE_COMMON_API_BASE_URL}/getAllDishWashers`,
    getDishWasherByID: `${import.meta.env.VITE_COMMON_API_BASE_URL}/getDishWasherByID`,
    checkReservation: `${import.meta.env.VITE_COMMON_API_BASE_URL}/checkReservation`
};

export const auth_api: AuthApiEndpoints = {
    base: import.meta.env.VITE_AUTH_API_BASE_URL,
    login: `${import.meta.env.VITE_AUTH_API_BASE_URL}/login`,
    register: `${import.meta.env.VITE_AUTH_API_BASE_URL}/register`,
    logout: `${import.meta.env.VITE_AUTH_API_BASE_URL}/logout`
};

export const user_api: UserApiEndpoints = {
    base: import.meta.env.VITE_USER_API_BASE_URL,
    getUserData: `${import.meta.env.VITE_USER_API_BASE_URL}/getUserData`,
    updateUserByID: `${import.meta.env.VITE_USER_API_BASE_URL}/updateUserByID`,
    getAllReservations: `${import.meta.env.VITE_USER_API_BASE_URL}/getAllReservations`,
    getReservationByID: `${import.meta.env.VITE_USER_API_BASE_URL}/getReservationByID`,
    addReservation: `${import.meta.env.VITE_USER_API_BASE_URL}/addReservation`,
    cancelReservationByID: `${import.meta.env.VITE_USER_API_BASE_URL}/cancelReservationByID`
};

export const admin_api : AdminApiEndpoints = {
    base: import.meta.env.VITE_ADMIN_API_BASE_URL,
    establishReservationByID: `${import.meta.env.VITE_ADMIN_API_BASE_URL}/establishReservationByID`,
    revokeReservationByID: `${import.meta.env.VITE_ADMIN_API_BASE_URL}/revokeReservationByID`
}