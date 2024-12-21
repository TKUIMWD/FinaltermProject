import { Service } from "../abstract/Service";
import { logger } from "../middlewares/log";
import { Document } from "mongoose";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { reservationsModel } from "../orm/schemas/reservationsSchemas";
import { dishwashersModel } from "../orm/schemas/dishwashersSchemas";
import moment from "moment-timezone";
import { DishWasher } from "../interfaces/DishWasher";
import { CheckReservation } from "../interfaces/CheckReservation";

export class CommonService extends Service {

    public async getAllDishWashers(): Promise<resp<Array<DBResp<Document>> | undefined>> {
        const resp: resp<Array<DBResp<Document>> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const dbResp: Array<DBResp<Document>> = await dishwashersModel.find({}).sort({ id: 1 });
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

    // get dishwasher by ID
    public async getDishWasherByID(_id: string): Promise<resp<DBResp<Document> | undefined>> {
        const resp: resp<DBResp<Document> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const dbResp: DBResp<Document> | null = await dishwashersModel.findOne({ _id });
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

    // check if a dishwasher is available on a given date
    // date format: "YYYY-MM-DD"
    public async checkReservation(_id: string, date: string): Promise<resp<CheckReservation | undefined>> {
        const resp: resp<CheckReservation | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const startOfDay = moment.tz(date, "Asia/Taipei").startOf('day').format("YYYY-MM-DD HH:mm");
            const endOfDay = moment.tz(date, "Asia/Taipei").endOf('day').format("YYYY-MM-DD HH:mm");

            const reservations = await reservationsModel.find({
                dish_washer: _id,
                start_time: { $lt: endOfDay },
                end_time: { $gt: startOfDay },
                status: "已成立"
            });
            // console.log(reservations,_id,startOfDay,endOfDay);
            if (reservations.length > 0) {
                resp.body = { hasReservation: true };
                resp.message = "Dishwasher is not available on the selected date";
            } else {
                resp.body = { hasReservation: false };
                resp.message = "Dishwasher is available on the selected date";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in checkReservation:", error);
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