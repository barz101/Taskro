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
const bcrypt = require('bcrypt');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const database_1 = __importDefault(require("../database"));
class UsersController {
    // public async list(req: Request, res: Response): Promise<void> {
    //     const users = await pool.query('SELECT * FROM users');
    //     res.send(users);
    // }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = 202;
            const users = yield database_1.default.query('SELECT * FROM users WHERE userID = ?', [id]);
            console.log(users, 'users');
            res.send(users);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
            if (users.length > 0) {
                return res.json(users[0]);
            }
            res.status(404).json({ text: "The user doesn't exits" });
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            const result = yield database_1.default.query('INSERT INTO users set ?', [body]);
            console.log('result', result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldUser = req.body;
            yield database_1.default.query('UPDATE users set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "The user was Updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM users WHERE id = ?', [id]);
            res.json({ message: "The user was deleted" });
        });
    }
}
const usersController = new UsersController;
exports.default = usersController;
