import { model, Schema } from "mongoose";
import { Reservation } from "../../interfaces/Reservation";

export const reservationsSchemas = new Schema<Reservation>({
    created_at: { type: String, required: true },
    status: { type: String, required: true },
    user_id: { type: String, required: true },
    username: { type: String, required: false },
    dish_washer_id: { type: String, required: true },
    dish_washer_nickname: { type: String, required: false },
    dish_washer_title: { type: String, required: false },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true }
});

export const reservationsModel = model<Reservation>('reservations', reservationsSchemas);
