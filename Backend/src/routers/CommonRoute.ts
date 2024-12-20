import { Route } from "../abstract/Route"
import { CommonController } from "../controller/CommonController";
import { logger } from "../middlewares/log";

export class CommonRoute extends Route {

    protected url: string;
    protected Contorller = new CommonController();

    constructor() {
        super()
        this.url = '/api/v1/common/'
        this.setRoutes()
    }

    protected setRoutes(): void {

        this.router.get(`${this.url}getAllDishWashers`, (req, res) => {
            this.Contorller.getAllDishWashers(req, res);
        })
    }
}