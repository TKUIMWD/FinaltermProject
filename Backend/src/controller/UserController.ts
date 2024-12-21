import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
require('dotenv').config()

export class UserController extends Contorller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    // get user data by token in header
    public async getUserData(Request: Request, Response: Response) {
        const resp = await this.service.getUserData(Request)
        Response.status(resp.code).send(resp)
    }

    public async updateUserByID(Request: Request, Response: Response) {
        const resp = await this.service.updateUserByID(Request)
        Response.status(resp.code).send(resp)
    }

    public async addReservation(Request: Request, Response: Response) {
        const resp = await this.service.addReservation(Request)
        Response.status(resp.code).send(resp)
    }
}