import { model, Schema } from "mongoose";
import { DishWasher } from "../../interfaces/DishWasher";

export const dishwashersSchemas = new Schema<DishWasher>({
    id: { type: Number, required: true },
    nickname: { type: String, required: true },
    title: { type: String, required: true },
    intro: { type: String, required: true },
    seniority: { type: Number, required: true },
    hourly_rate: { type: Number, required: true },
    areas: { type: Array, required: true },
});

export const dishwashersModel = model<DishWasher>('dish_washers', dishwashersSchemas);
