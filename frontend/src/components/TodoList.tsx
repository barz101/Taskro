import React from 'react';
import { TodoListItem } from './TodoListItem';

interface Props {
  todos: Todo[];
  deleteTodo: DeleteTodo;
}

export const TodoList: React.FC<Props> = ({ todos, deleteTodo }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoListItem key={todo.todoID} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </>
  );
};