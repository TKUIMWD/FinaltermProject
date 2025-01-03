import {reservation_status} from "../type/ReservationStatus";

export default interface ReservationWithDetails{
    _id: string;
    created_at: string;
    status: reservation_status;
    user_id: string;
    username: string;
    dish_washer_id: string;
    dish_washer_nickname: string;
    dish_washer_title: string;
    start_time: string;
    end_time: string;
    price: number;
    address: string;
    user_email?: string;
    user_phone_num?: string;
}