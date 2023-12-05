import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeDirectoryComponent = () => {
    const [employeeDirectory, setEmployeeDirectory] = useState([]);

    useEffect(() => {
        retrieveAllEmployees();
    }, []);

    const retrieveAllEmployees = () => {
        EmployeeService.fetchAllEmployees().then((response) => {
            setEmployeeDirectory(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const removeEmployee = (empId) => {
        EmployeeService.eraseEmployee(empId).then(() => {
            retrieveAllEmployees();
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="container">
            <h2 className="text-center">Employee Directory</h2>
            <Link to="/add-employee" className="btn btn-primary mb-2">New Employee</Link>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeDirectory.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.emailId}</td>
                            <td>
                                <Link to={`/edit-employee/${employee.id}`} className="btn btn-info">Edit</Link>
                                <button onClick={() => removeEmployee(employee.id)} className="btn btn-danger" style={{marginLeft: "10px"}}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeDirectoryComponent;
