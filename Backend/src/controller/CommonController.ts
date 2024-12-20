import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { CommonService } from "../Service/CommonService";
require('dotenv').config()

export class CommonController extends Contorller {
    protected service: CommonService;

    constructor() {
        super();
        this.service = new CommonService();
    }

    public async getAllDishWashers(Request: Request, Response: Response) {
        const resp = await this.service.getAllDishWashers()
        Response.send(resp)
    }

    public async getDishWasherByID(Request:Request,Response:Response){
        const resp = await this.service.getDishWasherByID(Request.query._id as string)
        Response.status(resp.code).send(resp)
    }
}