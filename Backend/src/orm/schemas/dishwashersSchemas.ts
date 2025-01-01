import { model, Schema } from "mongoose";
import { DishWasher } from "../../interfaces/DishWasher";

export const dishwashersSchemas = new Schema<DishWasher>({
    id: { type: String, required: true },
    nickname: { type: String, required: true },
    title: { type: String, required: true },
    intro: { type: String, required: true },
    seniority: { type: Number, required: true },
    hourly_rate: { type: Number, required: true },
    areas: { type: Array, required: true },
    img_name:{type:String,require:false}
});

export const dishwashersModel = model<DishWasher>('dish_washers', dishwashersSchemas);
