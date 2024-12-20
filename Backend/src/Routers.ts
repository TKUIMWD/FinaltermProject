import {Route} from "./abstract/Route";
import { CommonRoute } from "./routers/CommonRoute";
import { PageRoute } from "./routers/pageRoute";
import { UserRoute } from "./routers/UserRoute";

export const router: Array<Route> = [
    new PageRoute(),new UserRoute(),new CommonRoute()
];

