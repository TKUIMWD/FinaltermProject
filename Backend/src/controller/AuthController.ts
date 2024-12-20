import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { AuthService } from "../Service/AuthService";
require('dotenv').config()

export class AuthController extends Contorller {
    protected service: AuthService;

    constructor() {
        super();
        this.service = new AuthService();
    }


    //register with username and password
    public async register(Request: Request, Response: Response) {
        const resp = await this.service.register(Request.body)
        Response.status(resp.code).send(resp)
    }

    //login with username and password and set jwt token
    public async login(Request: Request, Response: Response) {
        const resp = await this.service.login(Request.body)
        Response.status(resp.code).send(resp)
    }
    
}