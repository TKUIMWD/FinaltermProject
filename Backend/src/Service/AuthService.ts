import bcrypt from "bcrypt";
import { Service } from "../abstract/Service";
import { usersModel } from "../orm/schemas/usersSchemas";
import { adminsModel } from "../orm/schemas/adminsSchemas";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { Document } from "mongoose";
import { generateToken, verifyToken } from "../utils/token";
import { AuthResponse } from "../interfaces/AuthResponse";
import { logger } from "../middlewares/log";

export class AuthService extends Service {

    public async register(data: { username: string, password: string, phone_num: string, email: string }): Promise<resp<DBResp<Document> | undefined>> {
        const resp: resp<DBResp<Document> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const { username, password, phone_num, email } = data;

            if (!phone_num) {
                resp.code = 400;
                resp.message = "Phone number is required";
                return resp;
            }

            const existingUser = await usersModel.findOne({ username });
            if (existingUser) {
                resp.code = 400;
                resp.message = "Username already exists";
                return resp;
            }

            const password_hash = await bcrypt.hash(password, 10);
            const res = new usersModel({ username, password_hash, phone_num, email });
            await res.save();
            logger.info(`User ${username} registered`);
            resp.message = "Register succeed";
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in register:", error);
        }
        return resp;
    }


    /*
    login with username and password and set jwt token , login should consider both admin model and user model
    */

    public async login(data: { username: string, password: string }): Promise<resp<AuthResponse | undefined>> {
        const resp: resp<AuthResponse | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const { username, password } = data;
            const user = await usersModel.findOne({ username });
            if (!user) {
                const admin = await adminsModel.findOne({ username });
                if (!admin || !await bcrypt.compare(password, admin.password_hash)) {
                    resp.code = 400;
                    resp.message = "密碼或帳號錯誤";
                    return resp;
                }
                const token = generateToken(admin._id, 'admin');
                resp.body = {
                    // data: {
                    //     id: admin._id,
                    //     username: admin.username,
                    // },
                    token
                } as AuthResponse;
                logger.info(`Admin ${username} logged in`);
                resp.message = "Login succeed";
                return resp;
            }
            if (!await bcrypt.compare(password, user.password_hash)) {
                resp.code = 400;
                resp.message = "密碼或帳號錯誤";
                return resp;
            }
            const token = generateToken(user._id, 'user');
            resp.body = {
                // data: {
                //     id: user._id,
                //     username: user.username,
                //     email: user.email,
                //     phone_num: user.phone_num,
                // },
                token
            } as AuthResponse;
            logger.info(`User ${username} logged in`);
            resp.message = "Login succeed";
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in login:", error);
        }
        return resp;
    }


    // logout with jwt token
    public async logout(data: { token: string }): Promise<resp<undefined>> {
        const resp: resp<undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const decoded = verifyToken(data.token);
            if (!decoded) {
                resp.code = 400;
                resp.message = "Invalid token";
                return resp;
            }
            const { _id, role } = decoded as { _id: string, role: string };
            let username = '';

            if (role === 'user') {
                const user = await usersModel.findOne({ _id });
                if (user) {
                    username = user.username;
                }
            } else if (role === 'admin') {
                const admin = await adminsModel.findOne({ _id });
                if (admin) {
                    username = admin.username;
                }
            }

            if (username) {
                logger.info(`${role.charAt(0).toUpperCase() + role.slice(1)} ${username} logged out`);
            } else {
                logger.info(`User with ID ${_id} and role ${role} logged out`);
            }

            resp.message = "Logout succeed";
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in logout:", error);
        }
        return resp;
    }

}