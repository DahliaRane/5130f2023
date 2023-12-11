// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import MainPageComponent from './components/MainPageComponent';
import LoginComponent from './components/LoginComponent';
import TimesheetComponent from './components/TimesheetComponent';
import PerformanceComponent from './components/PerformanceComponent'; // Import the PerformanceComponent

import 'bootstrap/dist/css/bootstrap.css';
import './App.css'; // Import your custom styles

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className={`container ${loggedIn ? 'authenticated' : ''}`}>
          <Switch>
            <Route exact path="/" render={() => (loggedIn ? <Redirect to="/main" /> : <LoginComponent onLogin={handleLogin} />)} />
            <Route path="/main" component={MainPageComponent}></Route>
            <Route path="/employees" component={ListEmployeeComponent}></Route>
            <Route path="/add-employee" component={AddEmployeeComponent}></Route>
            <Route path="/edit-employee/:id" component={AddEmployeeComponent}></Route>
            <Route path="/timesheet" component={TimesheetComponent}></Route>
            <Route path="/performance" component={PerformanceComponent}></Route> {/* Add this line for PerformanceComponent */}
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
