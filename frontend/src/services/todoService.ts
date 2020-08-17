import { GET, POST, PUT, DELETE } from '../services/httpService'

export default {
    query,
    add,
    update,
    deleteTodo,
    getByFilter
}

function query() {
    const user =   _getUser()
    return (GET(`todos/${user.userID}`));
}
function getByFilter(filter:string) {
    const user =  _getUser()
    return (GET(`todos/${user.userID}/${filter}`));
}

async function add(todo: object) {
    return POST(`todos`, todo);
}

function update(todo: Todo) {
    return  PUT(`todos/${todo.todoID}`, todo);
}

function deleteTodo(todoId: string) {
    return DELETE(`todos/${todoId}`);
}

function _getUser() {
    const user =   JSON.parse(sessionStorage.user);
    return user;
}