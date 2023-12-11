// Menu.jsx
import React from 'react';
import './Menu.css';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Menu = () => {
  const history = useHistory();

  const handleDashboardClick = () => {
    console.log('Dashboard clicked');
    history.push('/employees');
  };

  const handleEmployeeClick = () => console.log('Employee clicked');
  const handleTimesheetClick = () => {
    console.log('Timesheet clicked');
    history.push('/timesheet');
  };

  const handlePerformanceClick = () => {
    console.log('Performance clicked');
    history.push('/performance'); // Add this line to navigate to the Performance component
  };

  // ... (other button click handlers)

  return (
    <div>
      <Button onClick={handleDashboardClick}>Dashboard</Button>
      <Button onClick={handleEmployeeClick}>Employee</Button>
      <Button onClick={handleTimesheetClick}>Timesheet</Button>
      <Button onClick={handlePerformanceClick}>Performance</Button> {/* Add this line for the Performance button */}
      {/* ... (other buttons) */}
      <input type="text" placeholder="Quick Search" />
    </div>
  );
};

export default Menu;
