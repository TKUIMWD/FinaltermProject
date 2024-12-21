import { Route } from "../abstract/Route"
import { UserController } from "../controller/UserController";
import { logger } from "../middlewares/log";

export class UserRoute extends Route {

    protected url: string;
    protected Contorller = new UserController();

    constructor() {
        super()
        this.url = '/api/v1/user/'
        this.setRoutes()
    }

    protected setRoutes(): void {

        this.router.get(`${this.url}getUserData`, (req, res) => {
            this.Contorller.getUserData(req, res);
        })

        this.router.put(`${this.url}updateUserByID`, (req, res) => {
            this.Contorller.updateUserByID(req, res);
        })

        this.router.post(`${this.url}addReservation`, (req, res) => {
            this.Contorller.addReservation(req, res);
        })

        this.router.delete(`${this.url}cancelReservationByID`, (req, res) => {
            this.Contorller.cancelReservationByID(req, res);
        })
    }
}