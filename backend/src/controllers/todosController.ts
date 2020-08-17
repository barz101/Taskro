import { Request, Response } from 'express';

import pool from '../database';

class TodosController {
    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const todos = await pool.query('SELECT * FROM todos WHERE userID = ?', [id]);
        if (!todos.length) {
            res.status(404).json({ data: "no todos found" });
        }
        res.send(todos);
    }

    public async getByFilter(req: Request, res: Response): Promise<any> {
        const { id, filter } = req.params;
        var sql = `SELECT * FROM todos WHERE taskTitle LIKE "%${filter}%" AND userID = ?`;
        const todo = await pool.query(sql, [id]);
        if (todo.length > 0) {
            res.send(todo);
        }
       else res.status(404).json({ text: "The todo doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO todos set ?', [req.body],);
        res.send(result);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldTodo = req.body;
       const newTodo =  await pool.query('UPDATE todos set ? WHERE todoId = ?', [req.body, id]);
        res.json(newTodo);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM todos WHERE todoId = ?', [id]);
        res.json({ message: "The todo was deleted" });
    }
}

const todosController = new TodosController;
export default todosController;