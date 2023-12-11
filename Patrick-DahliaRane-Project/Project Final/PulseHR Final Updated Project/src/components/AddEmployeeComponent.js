import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import './AddEmployeeComponent.css'; // Your custom CSS file

const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [emailError, setEmailError] = useState('');
    const history = useHistory();
    const { id } = useParams();

    const isEmailValid = (email) => {
        // Basic email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if (!isEmailValid(emailId)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        setEmailError('');

        const employee = { firstName, lastName, emailId };

        if (id) {
            EmployeeService.updateEmployee(id, employee)
                .then((response) => {
                    history.push('/employees');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            EmployeeService.createEmployee(employee)
                .then((response) => {
                    console.log(response.data);
                    history.push('/employees');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmailId(response.data.emailId);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const title = () => {
        return id ? (
            <h2 className="text-center">Update Employee</h2>
        ) : (
            <h2 className="text-center">Add Employee</h2>
        );
    };

    return (
        <div className="add-employee-container">
            <Card className="form-card">
                <CardContent>
                    <Typography variant="h5">{title()}</Typography>
                    <form noValidate autoComplete="off">
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            label="Email Id"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <div className="form-actions">
                            <Button color="primary" variant="contained" onClick={saveOrUpdateEmployee}>
                                Submit
                            </Button>
                            <Link to="/employees">
                                <Button variant="contained">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddEmployeeComponent;
