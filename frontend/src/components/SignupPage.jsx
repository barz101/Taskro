import React, { useState } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import userService from '../services/userService';
const shortid = require('shortid');

function SignupPage() {
    const history = useHistory();
    const initialFormState = { userName: '', userPassword: '', userEmail: '' }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = (ev) => {
        const { name, value } = ev.target
        setUser({ ...user, [name]: value })
    }
    const handleFormSubmit = (ev) => {
        ev.preventDefault()
        const newUser = user;
        newUser.userID = shortid.generate();
       userService.signup(newUser).then((user) => {
        history.push('/todos')
        })
    }

    return (
        <div className="todo-container auth-page">
            <div className="auth-conainter flex fully-center">
                <form className="register-form flex column space-around align-center">
                    <div className="register-title">
                        הרשמה</div>
                    <input name="userName" value={user.userName} placeholder="שם משתמש" type="text" onChange={handleInputChange} />
                    <input name="userPassword" value={user.userPassword} placeholder="סיסמא" type="password" onChange={handleInputChange} />
                    <input name="userEmail" value={user.userEmail} placeholder="אימייל" type="text" onChange={handleInputChange} />
                    <div className="flex column">
                        <button onClick={handleFormSubmit}>הירשם</button>
                        <Link to="/login">כבר נרשמת? התחבר כעת</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default SignupPage;