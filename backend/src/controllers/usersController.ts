import { Request, Response } from 'express';
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
import pool from '../database';

class UsersController {

    public async login(req: Request, res: Response): Promise<any> {
        const body = req.body;
        const user = await pool.query('SELECT * FROM users WHERE userEmail = ?', [body.userEmail]);
        if (user.length > 0) {
            const result = compareSync(body.userPassword, user[0].userPassword);
            if (result) {
                user[0].userPassword = undefined;
                const jsontoken = sign({ result: user }, "qwe1234", {
                    expiresIn: "1h"
                });
                res.cookie("token", jsontoken,{ maxAge: 1800000, httpOnly: true }); 
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
        else res.json({ message: "user not exceeds" });
    }

    public async signup(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const salt = genSaltSync(10);
        body.userPassword = hashSync(body.userPassword, salt);
        const result = await pool.query('INSERT INTO users set ?', [body],);
    }
    public async logout(req:Request, res:Response): Promise<void> {
        res.clearCookie('token'); 
        res.status(200).json({ data: "logged out" });
    }
}

const usersController = new UsersController;
export default usersController;