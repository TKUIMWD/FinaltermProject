import { Service } from "../abstract/Service";
import { logger } from "../middlewares/log";
import { Document } from "mongoose";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { usersModel } from "../orm/schemas/usersSchemas";
import { adminsModel } from "../orm/schemas/adminsSchemas";
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
}