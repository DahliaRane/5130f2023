// src/components/PerformanceComponent.js
import React, { useState, useEffect } from 'react';
import './PerformanceComponent.css'; // Import the CSS file
import EmployeeService from '../services/EmployeeService'; // Import your service to fetch performance data

const PerformanceComponent = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // Fetch performance data when the component mounts
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      // Assume EmployeeService.fetchPerformanceData is a function that fetches performance data from your backend
      const data = await EmployeeService.fetchPerformanceData();
      setPerformanceData(data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  return (
    <div className="performance-container">
      <h2>Performance Overview</h2>
      {performanceData.length > 0 ? (
        <ul className="performance-list">
          {performanceData.map((performance, index) => (
            <li key={index} className="performance-item">
              <strong>{performance.employeeName}</strong>
              <p>KPI: {performance.kpi}</p>
              <p>Reviews: {performance.reviews}</p>
              {/* Add more performance-related information as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No performance data available.</p>
      )}
    </div>
  );
};

export default PerformanceComponent;
