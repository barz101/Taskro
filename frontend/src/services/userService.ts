import { GET, POST} from '../services/httpService'

export default {
    login,
    signup,
    getById,
    logout
}

async function login(user: string) {
    const result: any = await POST(`users/login`, user)
    if (result.success === 1) {
        return _handleLogin(result.user)
    }
    return result;
}
async function signup(user: object) {
    await POST(`users/signup`, user);
    return _handleLogin(user)
}

async function logout() {
    const user = JSON.parse(sessionStorage.user);
    const result: any = await POST(`users/logout`, user);
    sessionStorage.clear();
    return result;
}

function getById() {
    return GET(`users`)
}
function _handleLogin(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}