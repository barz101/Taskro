import { GET, POST, PUT, DELETE } from '../services/httpService'

export default {
    query,
    add,
    update,
    deleteTodo,
    getByFilter
}

function query() {
    const user =   JSON.parse(sessionStorage.user);
    return (GET(`todos/${user.userID}`));
}
function getByFilter(filter ='כלים') {
    const user =   JSON.parse(sessionStorage.user);
    return (GET(`todos/${user.userID}/${filter}`));
}

async function add(todo: object) {
    return POST(`todos`, todo);
}

function update(todo: Todo) {
    return PUT(`todos/${todo.todoID}`, todo);
}

function deleteTodo(todoId: string) {
    return DELETE(`todos/${todoId}`);
}