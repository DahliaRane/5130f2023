import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComponent.css'; // Your custom CSS file
import Menu from './Menu';


const HeaderComponent = () => {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        
                        <img src="/logo.jpg" alt="Company Logo" className="logo" />
                       PulseHR - Employee Management Application
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/Menu" className="nav-link">Main Page</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/employees" className="nav-link">Resources</Link>
                            </li>
                            {
                            /* Add more navigation links as needed */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HeaderComponent;
