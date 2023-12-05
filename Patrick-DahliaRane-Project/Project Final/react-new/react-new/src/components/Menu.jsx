import React from 'react';
import './Menu.css';
 // Your custom CSS file

// Define a Button component for reuse
const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} style={{ margin: '5px' }}>
      {children}
    </button>
  );
};

// Main Menu component that includes all buttons
const Menu = () => {
  // Placeholder functions for button click handlers
  const handleDashboardClick = () => console.log('Dashboard clicked');
  const handleEmployeeClick = () => console.log('Employee clicked');
  const handleTimesheetClick = () => console.log('Timesheet clicked');
  const handleLeavesClick = () => console.log('Leaves clicked');
  const handlePerformanceClick = () => console.log('Performance clicked');
  const handlePayrollClick = () => console.log('Payroll clicked');
  const handleReportsClick = () => console.log('Reports clicked');
  const handleSettingsClick = () => console.log('Settings clicked');
  
  return (
    <div>
      <Button onClick={handleDashboardClick}>Dashboard</Button>
      <Button onClick={handleEmployeeClick}>Employee</Button>
      <Button onClick={handleTimesheetClick}>Timesheet</Button>
      <Button onClick={handleLeavesClick}>Leaves</Button>
      <Button onClick={handlePerformanceClick}>Performance</Button>
      <Button onClick={handlePayrollClick}>Payroll</Button>
      <Button onClick={handleReportsClick}>Reports</Button>
      <Button onClick={handleSettingsClick}>Settings</Button>
      {/* Quick Search would be an input rather than a button */}
      <input type="text" placeholder="Quick Search" />
    </div>
  );
};

export default Menu;
