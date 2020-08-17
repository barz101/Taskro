import React, { useState, useEffect} from 'react';
import logo from '../styles/assets/imgs/logo.png';
import envloveIcon from '../styles/assets/svgs/envlove.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import userService from '../services/userService';

export default function Header() {
  let location = useLocation();
  let history = useHistory();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [currLocation, setLocation] = useState();

  useEffect(() => {
    const loc:any = window.location.pathname;  
    setLocation(loc)
    if (sessionStorage.user) {
      const user = JSON.parse(sessionStorage.user)
      setLoggedIn(user.userName)
    }
    else setLoggedIn(null)
  }, [location])

  return (
    <header className={`flex align-center space-between ${currLocation === '/' ? 'home' : ''}`}>
      <div className={`right-container flex ${isMenuOpen ? 'opened' : ''}`}>
        <div onClick={() => setMenuOpen(!isMenuOpen)} className="hamburger">
          <div className={`bar1 ${isMenuOpen ? 'close-icon' : ''}`}></div>
          <div className={`bar2 ${isMenuOpen ? 'close-icon' : ''}`}></div>
          <div className={`bar3 ${isMenuOpen ? 'close-icon' : ''}`}></div>
        </div>
        <div></div> {!loggedIn && <div className="property-type-btns">
          <button><Link to="/signup"> הירשם </Link></button>
          <button><Link to="/login"> התחבר </Link></button>
        </div>}
        {loggedIn && <div className="welcome flex">
          <div>{loggedIn} ברוך הבא</div>
          <button onClick={() => userService.logout().then(() => {
            setLoggedIn(null)
            history.push('/')
          })}>התנתק</button>
        </div>}
        {loggedIn && <span>
        <Link to="/todos">המשימות שלך</Link>
        </span>}
        <span>אודות</span>
        <span>
          <img className="icon" alt="envlove" src={envloveIcon}></img>
          <span>צור קשר</span>
        </span>
      </div>
      <div className="left-container flex">
        <span className="logo"><Link to="/"><img alt="logo" src={logo}></img></Link></span>
      </div>
    </header>
  );
}
