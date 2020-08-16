"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app: express.Application = express();
// const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser');
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const http = require('http').createServer(app);
const todoRoutes = require('./api/todos/todo.routes2');
//// Express App Config
app.use(bodyParser.json());
app.use(express_1.default.static('public'));
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('public'));
}
else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}
const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.log('apps listen at port', port);
});
app.use('/todos', todoRoutes);
