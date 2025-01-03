import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { AdminService } from "../Service/AdminService";
require('dotenv').config()

export class AdminController extends Contorller {
    protected service: AdminService;

    constructor() {
        super();
        this.service = new AdminService();
    }

    public async establishReservationByID(Request: Request, Response: Response) {     
        const resp = await this.service.establishReservationByID(Request)
        Response.status(resp.code).send(resp)
    }

    public async revokeReservationByID(Request: Request, Response: Response) {
        const resp = await this.service.revokeReservationByID(Request)
        Response.status(resp.code).send(resp)
    }

    public async getAllReservations(Request: Request, Response: Response) {
        const resp = await this.service.getAllReservations(Request)
        Response.status(resp.code).send(resp)
    }
}