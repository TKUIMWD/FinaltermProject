import { Service } from "../abstract/Service";
import { Student } from "../interfaces/Student";
import { logger } from "../middlewares/log";
import { studentsModel } from "../orm/schemas/studentSchemas";
import { Document } from "mongoose"
import { MongoDB } from "../utils/MongoDB";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { DeleteResult } from "mongodb";
import { DishWasher } from "../interfaces/DishWasher";
import { dishwashersModel } from "../orm/schemas/dishwashersSchemas";

export class CommonService extends Service {


    public async getAllDishWashers(): Promise<Array<DBResp<DishWasher>> | undefined> {
        const res: resp<Array<DBResp<DishWasher>> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        }

        try {
            const dbResp: Array<DBResp<DishWasher>> = await dishwashersModel.find({}).sort({ sid: 1 });

            if (dbResp) {
                res.body = dbResp;
                res.message = "find succeed";
            } else {
                res.code = 500;
                res.message = "server error";
            }

        } catch (error) {
            return undefined
        }
    }


    private async checkIDExists(id: string): Promise<boolean> {
        const dish_washers = await this.getAllDishWashers();
        return dish_washers && dish_washers.some(dish_washer => dish_washer.id === id) || false;
    }
}