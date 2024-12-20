import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
require('dotenv').config()

export class CommonController extends Contorller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    public async getAllDishWashers(Request: Request, Response: Response) {
        const resp = await this.service.getAllStudents()
        Response.send(resp)
    }
}