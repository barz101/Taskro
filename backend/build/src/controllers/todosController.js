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
const database_1 = __importDefault(require("../database"));
class TodosController {
    // public async list(req: Request, res: Response): Promise<void> {
    //     const todos = await pool.query('SELECT * FROM todos');
    //     res.send(todos);
    // }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = 202;
            const todos = yield database_1.default.query('SELECT * FROM todos WHERE userID = ?', [id]);
            console.log(todos, 'todos');
            res.send(todos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const todos = yield database_1.default.query('SELECT * FROM todos WHERE id = ?', [id]);
            if (todos.length > 0) {
                return res.json(todos[0]);
            }
            res.status(404).json({ text: "The todo doesn't exits" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO todos set ?', [req.body]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldTodo = req.body;
            yield database_1.default.query('UPDATE todos set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "The todo was Updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM todos WHERE id = ?', [id]);
            res.json({ message: "The todo was deleted" });
        });
    }
}
const todosController = new TodosController;
exports.default = todosController;
