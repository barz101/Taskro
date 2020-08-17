import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { ReactComponent as Check } from '../styles/assets/svgs/check.svg';
import viewIcon from '../styles/assets/svgs/view.svg';
import editIcon from '../styles/assets/svgs/edit.svg';
import deleteIcon from '../styles/assets/svgs/delete.svg';
import ContentEditable from 'react-contenteditable';
import todoService from '../services/todoService';

interface Props {
  todo: Todo;
  deleteTodo: DeleteTodo;
}

export const TodoListItem: React.FC<Props> = ({ todo, deleteTodo }) => {

  const [currTodo, setTodo] = useState<any>(todo);
  const [isEditOn, setEditing] = useState(false);
  const [isViewOn, setView] = useState(false);
  const [checked, setChecked] = useState(false);
  const refTaskTitle = useRef(currTodo.taskTitle);
  const refCategory = useRef(currTodo.category);
  const refPriority = useRef(currTodo.priority);


  const handleBlur = async (ev: any) => {
    const { id, innerText } = ev.target
    setTodo({ ...currTodo, [id]: innerText })
    todoService.update({ ...currTodo, [id]: innerText }).then(() => {
    })
  };

  const handleChange = (ev: any) => {
    switch (ev.currentTarget.id) {
      case 'taskTitle':
        refTaskTitle.current = ev.target.value;
        break;
      case 'category':
        refCategory.current = ev.target.value;
        break;
      case 'priority':
        refPriority.current = ev.target.value;
        break;
    }
  }
  const handleCheckBox = () => {
    setChecked(!checked);
    const todo = currTodo
    if (currTodo.doneAt === null) {
      todo.doneAt = Date.now()
      todoService.update(todo).then(() => {
        setTodo(todo)
      })
    }
    else {
      todo.doneAt = null;
      todoService.update(todo).then(() => {
        setTodo(todo)
      })
    }
  }

  const handleEdit = () => {
    setEditing(!isEditOn)
  }

  return (
    <tr className={isViewOn ? 'expanded' : 'hide'}>
      <td className="flex align-center">
        <label className="checkbox">
          <input type="checkbox" checked={checked} onChange={handleCheckBox}></input>
          <div className="square">
          </div>
        </label>
        <ContentEditable html={refTaskTitle.current} onBlur={handleBlur} onChange={handleChange}
          disabled={!isEditOn} id={'taskTitle'}
          className={isEditOn ? 'editable' : ''}
        />
      </td>
      <td>
        <ContentEditable html={refCategory.current} onBlur={handleBlur} onChange={handleChange}
          disabled={!isEditOn} id={'category'}
          className={isEditOn ? 'editable' : ''}
        />
      </td>
      <td>
        <ContentEditable html={refPriority.current} onBlur={handleBlur} onChange={handleChange}
          disabled={!isEditOn} id={'priority'}
          className={isEditOn ? 'editable priority' : ''}
        />
      </td>
      <td className="status">
        <Check className={currTodo.doneAt ? '' : 'white'}></Check>
        <span className={isViewOn ? 'expanded' : 'hidden'}>
          תאריך ביצוע: {currTodo.doneAt ? dayjs(currTodo.doneAt).format('DD.MM.YYYY') : 'טרם בוצעה'}
        </span>
      </td>
      <td>
        <span>{dayjs(currTodo.createdAt).format('DD.MM.YYYY')}</span>
      </td>
      <td className="flex space-between">
        <span className="actions">
          <img onClick={() => setView(!isViewOn)} className="icon" alt="path" src={viewIcon}></img>
          <br></br>
          <span>צפייה</span>
        </span>
        <span className="actions">
          <img onClick={handleEdit} className="icon" alt="path" src={editIcon}></img>
          <br></br>
          <span>עריכה</span>
        </span>
        <span className="actions">
          <img onClick={() => deleteTodo(currTodo.todoID)} className="icon" alt="path" src={deleteIcon}></img>
          <br></br>
          <span>מחיקה</span>
        </span>
        <span className={isViewOn ? 'expanded' : 'hidden'}></span>
      </td>
    </tr >
  );
};