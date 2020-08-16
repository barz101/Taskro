interface Todo {
    todoID: number;
    createdAt: number;
    doneAt: any;
    priority: string;
    category: string;
    taskTitle: string;
}

interface User {
    userID: number;
    createdAt: number;
    lastLoggedinAt: number;
}

type AddTodo = (newTodo: Todo) => void;
type DeleteTodo = (todoId: string) => void;
type EditTodo = (selectedTodo: Todo) => void;
type CloseModal = () => void;
