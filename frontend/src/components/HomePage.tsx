import React from 'react';
import { useHistory } from 'react-router-dom';
import userService from '../services/userService';

function HomePage() {
    let history = useHistory();
    const getStarted = () => {
        if (sessionStorage.user) {
            history.push('/todos')
        }
        else {
            const guest = { userEmail: 'guest@test.com', userPassword: '123' }
            userService.login(guest).then((result) => {
                if (result.userID) {
                    history.push('/todos')
                }
            })
        }
    }

    return (
        <div className="home-container home-page flex column">
            <section className="flex section-1 fully-center">
                <div className="flex column content content-1">
                    <h1>סדר את חייך</h1>
                    <p>רוצה להפוך את החיים שלך לפשוטים יותר? רוצה לשמור על סדר ולא לשכוח מטלות נחוצות? רוצה לגרום למשימות להתבצע? הגעת למקום הנכון.</p>
                    <button onClick={getStarted}>התחל עכשיו</button>
                </div>
                <div className="picture-1 picture"></div>
            </section>
            <section>

            </section>
            <section className="flex section-2 fully-center">
                <div className="flex column content content-2">
                    <h1>אל תשכח רעיונות</h1>
                    <p>"הרעיונות מובילים את העולם" - שמור על הרעיונות שלך, בעזרתנו לא תיאבד טיפה, מקסם את היצירתיות שלך וגלה מחוזות חדשים.</p>
                </div>
                <div className="picture-2 picture"></div>
            </section>
            <section className="flex section-3 fully-center">
                <div className="flex column content content-3">
                    <h1>הפוך לחבר הסופרמן</h1>
                    <p>"אושר אינו תוצאה של מה שאנחנו מקבלים בחיים, אלא מה שאנחנו נותנים" בעזרתנו תוכל לעזור ולתמוך יותר באנשים היקרים לך.</p>
                </div>
                <div className="picture-3 picture"></div></section>
        </div>
    )
}

export default HomePage;