import { model, Schema } from "mongoose";
import { Reservation } from "../../interfaces/Reservation";

export const reservationsSchemas = new Schema<Reservation>({
    created_at: { type: String, required: true },
    status: { type: String, required: true },
    customer: { type: String, required: true },
    dish_washer: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true }
});

export const reservationsModel = model<Reservation>('reservations', reservationsSchemas);
