import React from 'react';
import './styles/global.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TodoPage from "./components/TodoPage";
import Header from './components/Header';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/todos" component={TodoPage} exact />
          <Route path="/signup" component={SignupPage} exact />
          <Route path="/login" component={LoginPage} exact />
        <Route path="/" component={HomePage} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;