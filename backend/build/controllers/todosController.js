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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const todos = yield database_1.default.query('SELECT * FROM todos WHERE userID = ?', [id]);
            if (!todos.length) {
                console.log('todos123', todos.length);
                res.status(404).json({ data: "no todos found" });
            }
            res.send(todos);
        });
    }
    getByFilter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('got to func');
            const { id, filter } = req.params;
            var sql = `SELECT * FROM todos WHERE taskTitle LIKE "%${filter}%" AND userID = ?`;
            const todo = yield database_1.default.query(sql, [id]);
            if (todo.length > 0) {
                console.log(todo, 'todo');
                res.send(todo);
            }
            else
                res.status(404).json({ text: "The todo doesn't exits" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO todos set ?', [req.body]);
            res.send(result);
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
            console.log('here', req.params);
            console.log('here2', req.params.id);
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM todos WHERE todoId = ?', [id]);
            res.json({ message: "The todo was deleted" });
        });
    }
}
const todosController = new TodosController;
exports.default = todosController;
