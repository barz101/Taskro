"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todosController_1 = __importDefault(require("../controllers/todosController"));
class TodoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', todosController_1.default.list);
        this.router.get('/:id', todosController_1.default.getOne);
        this.router.post('/', todosController_1.default.create);
        this.router.put('/:id', todosController_1.default.update);
        this.router.delete('/:id', todosController_1.default.delete);
    }
}
exports.default = new TodoRoutes().router;
