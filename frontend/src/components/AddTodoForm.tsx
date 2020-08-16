import React, { useState } from 'react';
const shortid = require('shortid');

interface Props {
  addTodo: AddTodo;
  closeModal: CloseModal;
}

export const AddTodoForm: React.FC<Props> = ({ addTodo, closeModal }) => {
  const initialFormState: any = { priority: '', category: '', taskTitle: '' }
  const [todo, setTodo] = useState(initialFormState)

  const handleInputChange = (ev: any) => {
    const { name, value }: any = ev.target
    setTodo({ ...todo, [name]: value })
  }

  const handleFormSubmit = (ev: any) => {
    ev.preventDefault()
    const newTodo = todo;
    newTodo.createdAt = Date.now();
    newTodo.todoID = shortid.generate();
    newTodo.userID = JSON.parse(sessionStorage.user).userID;
    addTodo(todo)
    setTodo(initialFormState)
    handleClose(ev);
  }
  const handleClose = (ev: any) => {
    ev.preventDefault()
    closeModal()
  }
  return (
    <form onSubmit={handleFormSubmit} className="new-todo flex column align-center">
      <button onClick={handleClose} className="close">X</button>
      <label htmlFor="taskTitle">שם המשימה</label>
      <input id="taskTitle" type="text" name="taskTitle" value={todo.taskTitle} onChange={handleInputChange} />
      <label htmlFor="category">קטגוריה</label>
      <input type="text" id="category" name="category" value={todo.category} onChange={handleInputChange} />
      <label htmlFor="priority">עדיפות</label>
      <input type="text" id="priority" name="priority" value={todo.priority} onChange={handleInputChange} />
      {/* <label htmlFor="address">כתובת</label>
      <input type="text" id="address" name="address" placeholder={''} /> */}
      <button onClick={handleFormSubmit}>הוסף משימה חדשה</button>
    </form>
  )
};