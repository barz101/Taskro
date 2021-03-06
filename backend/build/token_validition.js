"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
    let { token } = req.cookies;
    if (token) {
        jwt.verify(token, 'qwe1234', (err, decoded) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Invalid Token..."
                });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.json({
            success: 0,
            message: "Access Denied! Unauthorized User"
        });
    }
};
exports.default = checkToken;
