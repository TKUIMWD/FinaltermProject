import { Route } from "../abstract/Route"
import { AdminController } from "../controller/AdminController";
import { logger } from "../middlewares/log";

export class AdminRoute extends Route {

    protected url: string;
    protected Contorller = new AdminController();

    constructor() {
        super()
        this.url = '/api/v1/admin/'
        this.setRoutes()
    }

    protected setRoutes(): void {
        this.router.post(`${this.url}establishReservationByID`, (req, res) => {
            this.Contorller.establishReservationByID(req, res);
        })

        this.router.delete(`${this.url}revokeReservationByID`, (req, res) => {
            this.Contorller.revokeReservationByID(req, res);
        })

        this.router.get(`${this.url}getAllReservations`, (req, res) => {
            this.Contorller.getAllReservations(req, res);
        })
    }
}