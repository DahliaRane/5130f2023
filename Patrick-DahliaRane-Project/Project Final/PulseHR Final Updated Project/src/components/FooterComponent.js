import React from 'react';
import './FooterComponent.css'; 

const FooterComponent = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer bg-dark text-white text-center py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img src="logo.svg" alt="We care, We listen, We grow." className="footer-logo" />
                    </div>
                    <div className="col-md-4">
                        <ul className="list-unstyled">
                            <li><a href="/privacy" className="text-white">Privacy Policy</a></li>
                            <li><a href="/terms" className="text-white">Terms of Service</a></li>
                            {/* More links as needed */}
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <p>Contact Us: pulseHR@yahoo.com</p>
                        {/* Social media icons */}
                    </div>
                </div>
                
            </div>
        </footer>
    );
}

export default FooterComponent;
