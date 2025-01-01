import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <h1>Class Routine App</h1>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/logout">Logout</Link>
            </nav>
        </header>
    );
};

export default Header;
