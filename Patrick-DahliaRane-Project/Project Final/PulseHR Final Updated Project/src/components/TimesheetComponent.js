// src/components/TimesheetComponent.js
import React, { useState } from 'react';
import './TimesheetComponent.css'; // Import the CSS file

const TimesheetComponent = () => {
  const [timesheetEntries, setTimesheetEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ date: '', hours: '' });

  const handleDateChange = (e) => {
    setNewEntry({ ...newEntry, date: e.target.value });
  };

  const handleHoursChange = (e) => {
    setNewEntry({ ...newEntry, hours: e.target.value });
  };

  const handleAddEntry = () => {
    if (newEntry.date && newEntry.hours) {
      setTimesheetEntries([...timesheetEntries, newEntry]);
      setNewEntry({ date: '', hours: '' });
    }
  };

  return (
    <div className="timesheet-container">
      <h2>Timesheet</h2>
      <div className="timesheet-entry">
        <label>Date:</label>
        <input type="date" value={newEntry.date} onChange={handleDateChange} />
      </div>
      <div className="timesheet-entry">
        <label>Hours:</label>
        <input type="number" value={newEntry.hours} onChange={handleHoursChange} />
      </div>
      <button onClick={handleAddEntry}>Add Entry</button>
      <hr />
      <h3>Timesheet Entries</h3>
      <ul className="timesheet-list">
        {timesheetEntries.map((entry, index) => (
          <li key={index} className="timesheet-list-item">
            {`Date: ${entry.date}, Hours: ${entry.hours}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimesheetComponent;
