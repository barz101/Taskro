import React, { useEffect, useState } from 'react';
import todoService from '../services/todoService';
import userService from '../services/userService';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
// import {Chart} from './Chart';
import searchIcon from '../styles/assets/svgs/search.svg';
import sortingIcon from '../styles/assets/svgs/sorting.svg';
import ErrorModal from './ErrorModal';


function TodoPage() {
    const [todos, setTodos] = useState<any>([]);
    const [isModalOpen, setModal] = useState(false);
    const [pagination, setPage] = useState({ currPage: 1, totalPages: 1, amountPerPage: 20 });

    useEffect(() => {
        todoService.query().then((todos: any) => {
            const totalPages = Math.ceil(todos.length / pagination.amountPerPage)
            setPage({ ...pagination, [pagination.totalPages]: totalPages })
            setTodos(todos)

        },
            error => {
                console.error('error ', error.message)
            })
    }, [todos])

    // useEffect(() => {

    // }
    const addTodo: AddTodo = (newTodo: Todo) => {
        console.log('gothere addtodo',newTodo);
        todoService.add(newTodo).then((todo) => {
            console.log(todo);
            
        })
        setTodos([...todos, newTodo]);
    }

    const deleteTodo: DeleteTodo = (todoId: string) => {
        todoService.deleteTodo(todoId).then((todoId) => {
            todos.splice(todos.indexOf(todoId), 1)
            setTodos([todos]);
        })
    }

    const closeModal: CloseModal = () => {
        setModal(!isModalOpen);
    }

    const searchTodo = (ev:any) => {
        ev.preventDefault()
        const filter = ev.target.value
        todoService.getByFilter(filter).then((todo) => {
            setTodos(todo)
        })
    }
    return (
        <div className="todo-container">
            <h1 className="todo-title">ניהול משימות</h1>
            <div className="search flex align-center space-between">
                <input onChange={searchTodo} placeholder="חיפוש משימה..."></input>
                <img src={searchIcon}></img>
            </div>
            {/* <Chart></Chart> */}
            {isModalOpen && <AddTodoForm addTodo={addTodo} closeModal={closeModal} />}
            <div className="flex space-between align-center">
                {todos && <h2>רשימת המשימות שלך: ({(todos.length) ? todos.length : 0})</h2>}
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
                    <TodoList todos={todos.slice(pagination.currPage - 1, 20)} deleteTodo={deleteTodo} />
                </tbody>}
            </table>
            <div className=" flex coulnm space-between pagination">
                <div className="results">
                    {todos && <span>מראה 1-{pagination.amountPerPage} מתוך {todos.length} תוצאות</span>}
                    <span className="result-input">{pagination.amountPerPage}</span>
                    <span>תוצאות לעמוד</span>
                </div>
                <div>
                    <button onClick={() => setPage({ ...pagination, [pagination.currPage]: 1 })}>ראשון</button>
                    <button onClick={() => setPage({ ...pagination, [pagination.currPage]: pagination.currPage - 1 })}>הקודם</button>
                    {[...Array(pagination.totalPages)].map((_, i) => <button key={i + 1} onClick={() => setPage({ ...pagination, [pagination.currPage]: i + 1 })}>{i + 1}</button>)}
                    <button onClick={() => setPage({ ...pagination, [pagination.currPage]: pagination.currPage + 1 })} >הבא</button>
                    <button onClick={() => setPage({ ...pagination, [pagination.currPage]: 1 })}>אחרון</button>
                </div>
            </div>
        </div>
    );
}

export default TodoPage;