import { Service } from "../abstract/Service";
import { logger } from "../middlewares/log";
import { Document } from "mongoose";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { usersModel } from "../orm/schemas/usersSchemas";
import { reservationsModel } from "../orm/schemas/reservationsSchemas";
import { dishwashersModel } from "../orm/schemas/dishwashersSchemas";
import { verifyToken } from "../utils/token";
import { Request, Response } from "express";
import moment from "moment-timezone";
import { adminsModel } from "../orm/schemas/adminsSchemas";

export class UserService extends Service {

    // get user data by token in header
    public async getUserData(Request: Request): Promise<resp<DBResp<Document> | undefined>> {
        const resp: resp<DBResp<Document> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const authHeader = Request.headers.authorization;
            if (!authHeader) {
                resp.code = 400;
                resp.message = "Token is required";
                return resp;
            }

            const token = authHeader.split(' ')[1];
            const decoded = verifyToken(token);
            if (!decoded) {
                resp.code = 400;
                resp.message = "Invalid token";
                return resp;
            }
            const { _id } = decoded as { _id: string };
            const user = await usersModel.findById(_id).select('-password_hash -__v');
            if (user) {
                resp.body = user;
                resp.message = "User found successfully";
            } else {
                resp.code = 404;
                resp.message = "User not found";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in getUserData:", error);
        }
        return resp;
    }

    // get all reservations for a user
    public async getAllReservations(Request: Request): Promise<resp<DBResp<Document>[] | undefined>> {
        const resp: resp<DBResp<Document>[] | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const authHeader = Request.headers.authorization;
            if (!authHeader) {
                resp.code = 400;
                resp.message = "Token is required";
                return resp;
            }

            const token = authHeader.split(' ')[1];
            const decoded = verifyToken(token);
            if (!decoded) {
                resp.code = 400;
                resp.message = "Invalid token";
                return resp;
            }

            const { _id } = decoded as { _id: string };
            const user = await usersModel.findById(_id).select('reservations');
            if (!user) {
                resp.code = 404;
                resp.message = "User not found";
                return resp;
            }

            const reservations = await reservationsModel.find({ _id: { $in: user.reservations } });
            resp.body = reservations;
            resp.message = "Reservations found successfully";
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in getAllReservations:", error);
        }
        return resp;
    }

    // update user by ID
    public async updateUserByID(Request: Request): Promise<resp<DBResp<Document> | undefined>> {
        const resp: resp<DBResp<Document> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const authHeader = Request.headers.authorization;
            if (!authHeader) {
                resp.code = 400;
                resp.message = "Token is required";
                return resp;
            }

            const token = authHeader.split(' ')[1];
            const decoded = verifyToken(token);
            if (!decoded) {
                resp.code = 400;
                resp.message = "Invalid token";
                return resp;
            }

            const { _id } = decoded as { _id: string };
            const { username, phone_num, email } = Request.body;

            const user = await usersModel.findById(_id);
            if (!user) {
                resp.code = 404;
                resp.message = "User not found";
                return resp;
            }

            // 如果欲更新的 username 不等於原本的 username，才檢查是否與其他用戶或管理員同名
            if (username && username !== user.username) {
                const existingUser = await usersModel.findOne({ username });
                const existingAdmin = await adminsModel.findOne({ username });
                if (existingUser || existingAdmin) {
                    resp.code = 400;
                    resp.message = "Invalid request";
                    return resp;
                }
                user.username = username;
            }

            if (phone_num) user.phone_num = phone_num;
            if (email) user.email = email;

            await user.save();
            // resp.body = user;
            resp.message = "User updated successfully";
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in updateUserByID:", error);
        }
        return resp;
    }

    // addReservation
    public async addReservation(Request: Request): Promise<resp<DBResp<Document> | undefined>> {
        const resp: resp<DBResp<Document> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const authHeader = Request.headers.authorization;
            if (!authHeader) {
                resp.code = 400;
                resp.message = "Token is required";
                return resp;
            }

            const token = authHeader.split(' ')[1];
            const decoded = verifyToken(token);
            if (!decoded) {
                resp.code = 400;
                resp.message = "Invalid token";
                return resp;
            }

            const { _id } = decoded as { _id: string };
            const { dish_washer, start_time, end_time, address } = Request.body;

            const dishWasherUser = await dishwashersModel.findById(dish_washer).select('hourly_rate');
            if (!dishWasherUser) {
                resp.code = 404;
                resp.message = "Dish washer not found";
                return resp;
            }

            const duration = moment.duration(moment(end_time).diff(moment(start_time)));
            const hours = duration.asHours();
            const price = Math.floor(dishWasherUser.hourly_rate * hours);

            const formattedStartTime = moment.tz(start_time, "Asia/Taipei").format("YYYY-MM-DD HH:mm");
            const formattedEndTime = moment.tz(end_time, "Asia/Taipei").format("YYYY-MM-DD HH:mm");

            const reservation = new reservationsModel({
                created_at: moment().tz("Asia/Taipei").format("YYYY-MM-DD HH:mm:ss"),
                status: "未成立",
                customer: _id,
                dish_washer: dish_washer,
                start_time: formattedStartTime,
                end_time: formattedEndTime,
                price: price,
                address: address
            });

            await reservation.save();

            await usersModel.findByIdAndUpdate(_id, { $push: { reservations: reservation._id } });
            // resp.body = reservation.toObject({ versionKey: false });
            resp.message = "Reservation added successfully";
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in addReservation:", error);
        }
        return resp;
    }

    // cancel ReservationBy ID , only customer can cancel reservation , set status to "取消"
    public async cancelReservationByID(Request: Request): Promise<resp<DBResp<Document> | undefined>> {
        const resp: resp<DBResp<Document> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const authHeader = Request.headers.authorization;
            if (!authHeader) {
                resp.code = 400;
                resp.message = "Token is required";
                return resp;
            }

            const token = authHeader.split(' ')[1];
            const decoded = verifyToken(token);
            if (!decoded) {
                resp.code = 400;
                resp.message = "Invalid token";
                return resp;
            }

            const { _id: user_id } = decoded as { _id: string };
            const { _id } = Request.query;
            // console.log(_id,user_id);
            const reservation = await reservationsModel.findById(_id);
            if (!reservation) {
                resp.code = 404;
                resp.message = "Reservation not found";
                return resp;
            }

            if (reservation.customer.toString() !== user_id) {
                resp.code = 403;
                resp.message = "Unauthorized";
                return resp;
            }
            if (reservation.status == "未成立") {
                resp.code = 200;
                reservation.status = "取消";
                resp.message = "Reservation canceled successfully";
                await reservation.save();
            } else if (reservation.status == "成立") {
                resp.code = 404;
                resp.message = "Contact customer service to cancel the reservation";
            } else {
                resp.code = 404;
                resp.message = "Reservation has been canceled";
            }
            // resp.body = reservation;

        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in cancelReservationByID:", error);
        }
        return resp;
    }

}