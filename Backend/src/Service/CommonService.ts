import { Service } from "../abstract/Service";
import { logger } from "../middlewares/log";
import { Document } from "mongoose"
import { MongoDB } from "../utils/MongoDB";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { DeleteResult } from "mongodb";
import { DishWasher } from "../interfaces/DishWasher";
import { dishwashersModel } from "../orm/schemas/dishwashersSchemas";

export class CommonService extends Service {


    public async getAllDishWashers(): Promise<resp<Array<DBResp<DishWasher>> | undefined>> {
        const resp: resp<Array<DBResp<DishWasher>> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const dbResp: Array<DBResp<DishWasher>> = await dishwashersModel.find({}).sort({ id: 1 });
            if (dbResp.length > 0) {
                resp.body = dbResp;
                resp.message = "Find succeed";
            } else {
                resp.code = 404;
                resp.message = "No records found";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in getAllDishWashers:", error);
        }
        return resp;
    }


    public async getDishWasherByID(_id: string): Promise<resp<DBResp<DishWasher> | undefined>> {
        const resp: resp<DBResp<DishWasher> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const dbResp: DBResp<DishWasher> | null = await dishwashersModel.findOne({ _id: _id });
            if (dbResp) {
                resp.body = dbResp;
                resp.message = "Dishwasher found successfully";
            } else {
                resp.code = 404;
                resp.message = "Dishwasher not found";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in getDishWasherByID:", error);
        }
        return resp;
    }



    private async checkIDExists(id: number): Promise<boolean> {
        try {
            const dishWashersResp = await this.getAllDishWashers();
            if (dishWashersResp && dishWashersResp.body) {
                const dishWashers = dishWashersResp.body;
                return dishWashers.some(dishWasher => dishWasher.id === id);
            }
            return false;
        } catch (error) {
            console.error("Error in checkIDExists:", error);
            return false;
        }
    }
}