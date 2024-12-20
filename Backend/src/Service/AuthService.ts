import { Document } from "mongoose";
import { MongoDB } from "../utils/MongoDB";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { DeleteResult } from "mongodb";
import { usersModel } from "../orm/schemas/usersSchemas";
import bcrypt from "bcrypt";
import { Service } from "../abstract/Service";

export class AuthService extends Service {

    public async register(username: string, password: string, phone_num: string): Promise<resp<DBResp<Document> | undefined>> {
        const resp: resp<DBResp<Document> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            const existingUser = await usersModel.findOne({ username });
            if (existingUser) {
                resp.code = 400;
                resp.message = "Username already exists";
                return resp;
            }

            const password_hash = await bcrypt.hash(password, 10);

            const res = new usersModel({ username, password_hash, phone_num });
            await res.save();
            resp.message = "Register succeed";
        } catch (error) {
            resp.code = 500;
            resp.message = "Server error";
            console.error("Error in register:", error);
        }
        return resp;
    }
}