import { verifyToken } from "../utils/token";
import { Request, Response } from "express";
import moment from "moment-timezone";
import { adminsModel } from "../orm/schemas/adminsSchemas";
import { reservationsModel } from "../orm/schemas/reservationsSchemas";
import { Service } from "../abstract/Service";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";

export class AdminService extends Service {

    // establish Reservation By ID , verify token is admin, check if reservation exists, update reservation status to "成立"
    public async establishReservationByID(Request: Request): Promise<resp<DBResp<Document> | undefined>> {
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

            if (decoded && typeof decoded !== 'string') {
                const admin = await adminsModel.findOne({ _id: decoded._id });
                if (admin) {
                    const {_id} = Request.query;
                    if (!_id) {
                        resp.code = 400;
                        resp.message = "Reservation ID is required";
                        return resp;
                    }
                    const reservation = await reservationsModel.findById(_id);
                    if (reservation) {
                        if (reservation.status === "成立") {
                            resp.code = 400;
                            resp.message = "Reservation is already established";
                        } else if (reservation.status === "取消") {
                            resp.code = 400;
                            resp.message = "Reservation has already been canceled";
                        } else if (reservation.status === "撤銷") {
                            resp.code = 400;
                            resp.message = "Reservation has already been revoked";
                        } else {
                            reservation.status = "成立";
                            await reservation.save();
                            // resp.body = reservation;
                            resp.message = "Reservation established successfully";
                        }
                    } else {
                        resp.code = 404;
                        resp.message = "Reservation not found";
                    }
                } else {
                    resp.code = 403;
                    resp.message = "Permission denied";
                }
            } else {
                resp.code = 401;
                resp.message = "Invalid token or insufficient permissions";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in establishReservationByID:", error);
        }
        return resp;
    }

    public async revokeReservationByID(Request: Request): Promise<resp<DBResp<Document> | undefined>> { 
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

            if (decoded && typeof decoded !== 'string') {
                const admin = await adminsModel.findOne({ _id: decoded._id });
                if (admin) {
                    const {_id} = Request.query;
                    if (!_id) {
                        resp.code = 400;
                        resp.message = "Reservation ID is required";
                        return resp;
                    }
                    const reservation = await reservationsModel.findById(_id);
                    if (reservation) {
                        if (reservation.status === "取消") {
                            resp.code = 400;
                            resp.message = "Reservation has already been canceled";
                        } else if (reservation.status === "撤銷") {
                            resp.code = 400;
                            resp.message = "Reservation has already been revoked";
                        } else {
                            reservation.status = "撤銷";
                            await reservation.save();
                            // resp.body = reservation;
                            resp.message = "Reservation revoked successfully";
                        }
                    } else {
                        resp.code = 404;
                        resp.message = "Reservation not found";
                    }
                } else {
                    resp.code = 403;
                    resp.message = "Permission denied";
                }
            } else {
                resp.code = 401;
                resp.message = "Invalid token or insufficient permissions";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in revokeReservationByID:", error);
        }
        return resp;
    }    
}