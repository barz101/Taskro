import  { Router } from 'express';

import usersController from '../controllers/usersController';
import  checkToken  from "../token_validition";

class UserRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/login', usersController.login);
        this.router.post('/signup', usersController.signup);
        this.router.post('/logout', checkToken, usersController.logout)
    }

}

export default new UserRoutes().router;

