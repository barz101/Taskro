import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link, useHistory } from "react-router-dom";
import userService from '../services/userService';
import { withRouter } from 'react-router';

function LoginPage() {
    const history = useHistory();
    const initialFormState = { userPassword: 'סיסמא', userEmail: 'אימייל' }
    const [user, setUser] = useState(initialFormState)
    const [errorMsg, setErrorMsg] = useState()

    const handleInputChange = (ev) => {
        const { name, value } = ev.target
        setUser({ ...user, [name]: value })
    }
    const handleFormSubmit = (ev) => {
        ev.preventDefault()
        userService.login(user).then((result) => {
            if (result.userID) {
                setUser(initialFormState)
                history.push('/todos')
            }
            else setErrorMsg(result.message)
        })
    }
    return (
        <div className="todo-container auth-page">
            <div className="auth-conainter flex fully-center">
                <form className="register-form flex column space-around align-center">
                    <div className="register-title">
                        התחברות</div>
                    <input name="userEmail" value={user.userEmail} placeholder="אימייל" type="text" onChange={handleInputChange} />
                    <input name="userPassword" value={user.userPassword} placeholder="סיסמא" type="password" onChange={handleInputChange} />
                    {errorMsg && <span>{errorMsg}</span>}
                    <div className="flex column">
                        <button onClick={handleFormSubmit}>התחבר</button>
                        <Link to="/signup">עוד לא נרשמת? לחץ להרשמה</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default withRouter(LoginPage);