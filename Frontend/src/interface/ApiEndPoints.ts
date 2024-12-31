export interface CommonApiEndpoints {
    base: string;
    getAllDishWashers: string;
    getDishWasherByID: string;
    checkReservation: string;
}

export interface AuthApiEndpoints {
    base: string;
    login: string;
    register: string;
    logout: string;
}

export interface UserApiEndpoints {
    base: string;
    getUserData: string;
    updateUserByID: string;
    getAllReservations: string;
    getReservationByID: string;
    addReservation: string;
    cancelReservationByID: string;
}

export interface AdminApiEndpoints {
    base: string;
    establishReservationByID: string;
    revokeReservationByID: string;
}