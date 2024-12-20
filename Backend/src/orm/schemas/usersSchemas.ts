import { model, Schema } from "mongoose";
import { User } from "../../interfaces/User";

export const usersSchemas = new Schema<User>({
    username: { type: String, required: true },
    password_hash: { type: String, required: true },
    reservations: { type: Array, required: true },
    phone_num: { type: String, required: true },
    email: { type: String, required: true }
});

export const usersModel = model<User>('users', usersSchemas);
