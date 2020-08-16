"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const token_validition_1 = __importDefault(require("../token_validition"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/login', usersController_1.default.login);
        this.router.post('/signup', usersController_1.default.signup);
        this.router.post('/logout', token_validition_1.default, usersController_1.default.logout);
    }
}
exports.default = new UserRoutes().router;
