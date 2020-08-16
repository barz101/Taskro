"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const database_1 = __importDefault(require("../database"));
class UsersController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const user = yield database_1.default.query('SELECT * FROM users WHERE userEmail = ?', [body.userEmail]);
            if (user.length > 0) {
                const result = compareSync(body.userPassword, user[0].userPassword);
                if (result) {
                    user[0].userPassword = undefined;
                    const jsontoken = sign({ result: user }, "qwe1234", {
                        expiresIn: "1h"
                    });
                    res.cookie("token", jsontoken, { maxAge: 1800000, httpOnly: true });
                    return res.json({
                        success: 1,
                        message: "login successfully",
                        user: user[0]
                    });
                }
                else {
                    return res.json({
                        success: 0,
                        message: "Invalid email or password"
                    });
                }
            }
            else
                res.json({ message: "user not exceeds" });
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const salt = genSaltSync(10);
            body.userPassword = hashSync(body.userPassword, salt);
            const result = yield database_1.default.query('INSERT INTO users set ?', [body]);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('token');
            res.status(200).json({ data: "logged out" });
        });
    }
}
const usersController = new UsersController;
exports.default = usersController;
