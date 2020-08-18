import React, { useEffect, useState } from 'react';
import todoService from '../services/todoService';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
import searchIcon from '../styles/assets/svgs/search.svg';
import sortingIcon from '../styles/assets/svgs/sorting.svg';

function TodoPage() {
    const [todos, setTodos] = useState<any>([]);
    const [isModalOpen, setModal] = useState(false);
    const [pagination, setPage] = useState({ currPage: 1, totalPages: 1, amountPerPage: 10 });

    useEffect(() => {
        todoService.query().then((todos: any) => {
            const userTotalPages = Math.ceil(todos.length / pagination.amountPerPage)
            setPage(pagination => ({ ...pagination, totalPages: userTotalPages }))
            setTodos(todos)
        },
            error => {
                console.error('error ', error.message)
            })
    }, [])

    useEffect(() => {
        const userTotalPages = Math.ceil(todos.length / pagination.amountPerPage)
        setPage(pagination => ({ ...pagination, totalPages: userTotalPages }))
    }, [todos])

    const addTodo: AddTodo = (newTodo: Todo) => {
        todoService.add(newTodo).then(() => {
            todoService.query().then((todos: any) => {
                setTodos(todos);
            })
        })
    }

    const deleteTodo: DeleteTodo = (todoId: string) => {
        todoService.deleteTodo(todoId).then((todoId) => {
            todoService.query().then((todos: any) => {
                setTodos(todos);
            })
        })
    }

    const closeModal: CloseModal = () => {
        setModal(!isModalOpen);
    }

    const searchTodo = (ev: any) => {
        const filter = ev.target.value
        todoService.getByFilter(filter).then((todos) => {
            setTodos(todos)
        },
            error => {
                console.error('error ', error.message)
                setTodos([])
            })
    }

    const setTodosPerPage = (ev: any) => {
        const newAmount = +ev.target.value
        setPage(pagination => ({ ...pagination, amountPerPage: newAmount }))
    }
    return (
        <div className="todo-container">
            <h1 className="todo-title">ניהול משימות</h1>
            <div className="search flex align-center space-between">
                <input onChange={searchTodo} placeholder="חיפוש משימה..."></input>
                <img src={searchIcon}></img>
            </div>
            {isModalOpen && <AddTodoForm addTodo={addTodo} closeModal={closeModal} />}
            <div className="flex space-between align-center">
                <h2>רשימת המשימות שלך: ({(todos.length) ? todos.length : 0})</h2>
                <button className="new-task" onClick={() => setModal(!isModalOpen)}>משימה חדשה</button>
            </div>
            <table>
                <thead>
                    <tr className="table-title">
                        <th>
                            <span> שם המשימה </span> <img src={sortingIcon}></img>
                        </th>
                        <th>קטגוריה</th>
                        <th>עדיפות</th>
                        <th>סטטוס</th>
                        <th>תאריך יצירת המשימה <img src={sortingIcon}></img></th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                {todos.length > 0 && <tbody>
                    <TodoList todos={todos.slice((pagination.currPage - 1) * pagination.amountPerPage, (pagination.amountPerPage) * pagination.currPage)} deleteTodo={deleteTodo} />
                </tbody>}
            </table>
            <div className=" flex coulnm space-between pagination">
                <div className="results">
                    {todos && <span>מראה 1-{pagination.amountPerPage} מתוך {todos.length} תוצאות</span>}
                    <input onChange={setTodosPerPage} className="result-input"
                        placeholder={String(pagination.amountPerPage)}
                    ></input>
                    <span>תוצאות לעמוד</span>
                </div>
                <div>
                    <button onClick={() => setPage(pagination => ({ ...pagination, currPage: 1 }))}>ראשון</button>
                    <button onClick={() => setPage(pagination => ({ ...pagination, currPage: pagination.currPage === 1 ? 1 : pagination.currPage - 1 }))}>הקודם</button>
                    {[...Array(pagination.totalPages)].map((_, i) => <button className={pagination.currPage === i + 1 ? 'active-page' : ''} key={i + 1} onClick={() => setPage(pagination => ({ ...pagination, currPage: i + 1 }))}>{i + 1}</button>)}
                    <button onClick={() => setPage(pagination => ({ ...pagination, currPage: pagination.currPage === pagination.totalPages ? pagination.totalPages : pagination.currPage + 1 }))} >הבא</button>
                    <button onClick={() => setPage(pagination => ({ ...pagination, currPage: pagination.totalPages }))}>אחרון</button>
                </div>
            </div>
        </div>
    );
}

export default TodoPage;