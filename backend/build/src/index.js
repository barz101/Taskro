"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const todosRoutes_1 = __importDefault(require("./routes/todosRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
}
else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}
app.use('/api/todos', todosRoutes_1.default);
app.use('/api/users', usersRoutes_1.default);
const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.log('apps listen at port', port);
});
