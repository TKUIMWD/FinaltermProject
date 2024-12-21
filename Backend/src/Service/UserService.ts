import { Service } from "../abstract/Service";
import { logger } from "../middlewares/log";
import { Document } from "mongoose";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { usersModel } from "../orm/schemas/usersSchemas";
import { verifyToken } from "../utils/token";
import { Request, Response } from "express";

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
}