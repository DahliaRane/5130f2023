import React, { useState } from 'react';
import './MainPageComponent.css';

const MainPageComponent = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };

  return (
    <>
    <div className="mainContainer">
      <div className="left">
        {/* User Icon */}
        <img src="/samples-svgrepo-com.svg" alt="User Icon" className="user-icon" />
      </div>
      <div className="center">
        {/* Title with Border */}
        <h1 className="title">Pulse HR - EMS</h1>
      </div>
      <div className="right">
        {/* Rounded Company Logo */}
        <img src="/samples-svgrepo-com.svg" alt="Company Logo" className="company-logo" />
      </div>
    </div>
    <div className="menu-container">
        {/* Menu Button */}
        <button className="menu-button" onClick={toggleMenu}>
          Menu <span className={`carrot-icon ${showMenu ? 'up' : 'down'}`}></span>
        </button>
        {/* Container of Buttons */}
        {showMenu && (
              <div className="buttons-container">
              <div className="button-row">
                <button className="menu-button">Dashboard</button>
                <button className="menu-button">Timesheet</button>
                <button className="menu-button">Payroll</button>
                <button className="menu-button">Reports</button>
              </div>
              <div className="button-row">
                <button className="menu-button">Employee</button>
                <button className="menu-button">Leaves</button>
                <button className="menu-button">Performance</button>
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
