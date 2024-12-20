import { model, Schema } from "mongoose";
import { Admin } from "../../interfaces/Admin";

export const adminsSchemas = new Schema<Admin>({
    username: { type: String, required: true },
    password_hash: { type: String, required: true }
});

export const adminsModel = model<Admin>('admins', adminsSchemas);
