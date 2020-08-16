import { Router } from 'express';

import todosController from '../controllers/todosController';
import checkToken from "../token_validition";

class TodoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id', checkToken, todosController.list);
        this.router.get('/:id/:filter', checkToken, todosController.getByFilter);
        this.router.post('/',checkToken, todosController.create);
        this.router.put('/:id',checkToken, todosController.update);
        this.router.delete('/:id',checkToken, todosController.delete);
    }
}

export default new TodoRoutes().router;

