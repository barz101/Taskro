import React from 'react';


function HomePage() {
    return (
        <div className="home-container home-page flex column">
            <section className="flex section-1 fully-center">
                <div className="flex column content content-1">
                    <h1>סדר את חייך</h1>
                    <p>רוצה להפוך את החיים שלך לפשוטים יותר? רוצה לשמור על סדר ולא לשכוח מטלות נחוצות? רוצה לגרום למשימות להתבצע? הגעת למקום הנכון.</p>
                    <button>התחל עכשיו</button>
                </div>
                <div className="picture-1 picture"></div>
            </section>
            <section>

            </section>
            <section className="flex section-2 fully-center">
                <div className="flex column content content-2">
                    <h1>אל תשכח רעיונות</h1>
                    <p>רוצה להפוך את החיים שלך לפשוטים יותר? רוצה לשמור על סדר ולא לשכוח מטלות נחוצות? רוצה לגרום למשימות להתבצע? הגעת למקום הנכון.</p>
                    </div>
                <div className="picture-2 picture"></div>
                </section>
            <section className="flex section-3 fully-center">   
             <div className="flex column content content-3">
                <h1>הפוך לחבר הסופרמן</h1>
                <p>רוצה להפוך את החיים שלך לפשוטים יותר? רוצה לשמור על סדר ולא לשכוח מטלות נחוצות? רוצה לגרום למשימות להתבצע? הגעת למקום הנכון.</p>
            </div>
                <div className="picture-3 picture"></div></section>
        </div>
    )
}

export default HomePage;