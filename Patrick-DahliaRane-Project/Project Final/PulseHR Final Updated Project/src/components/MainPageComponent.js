// MainPageComponent.jsx
import React, { useState } from 'react';
import './MainPageComponent.css';
import { useHistory } from 'react-router-dom';

const MainPageComponent = () => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDashboardClick = () => {
    console.log('Dashboard clicked');
    history.push('/employees');
  };

  const handleTimesheetClick = () => {
    console.log('Timesheet clicked');
    history.push('/timesheet');
  };

  const handlePerformanceClick = () => {
    console.log('Performance clicked');
    history.push('/performance'); // Add this line to navigate to the Performance component
  };

  return (
    <>
      <div className="mainContainer">
        <div className="left">
          {/* User Icon */}
          <img src="/logo.jpg" alt="User Icon" className="user-icon" />
        </div>
        <div className="center">
          {/* Title with Border */}
          <h1 className="title">Pulse HR - EMS</h1>
        </div>
        <div className="right">
          {/* Rounded Company Logo */}
          <img src="/logo.jpg" alt="User Icon" className="user-icon" />
        </div>
      </div>
      <div className="menu-container">
        <button className="menu-button" onClick={toggleMenu}>
          Menu <span className={`carrot-icon ${showMenu ? 'up' : 'down'}`}></span>
        </button>
        {showMenu && (
          <div className="buttons-container">
            <div className="button-row">
              <button onClick={handleDashboardClick} className="menu-button">
                Dashboard
              </button>
              <button onClick={handleTimesheetClick} className="menu-button">
                Timesheet
              </button>
              <button onClick={handlePerformanceClick} className="menu-button">
                Performance
              </button>
              <button className="menu-button">Reports</button>
            </div>
            <div className="button-row">
              <button className="menu-button">Employee</button>
              <button className="menu-button">Leaves</button>
              <button className="menu-button">Settings</button>
            </div>
          </div>
        )}
      </div>
      <div className="search-container">
        {/* Search Input with Search Icon */}
        Quick Search:
        <div className="search-wrapper">
          <span className="search-icon">&#128269;</span>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
    </>
  );
};

export default MainPageComponent;
