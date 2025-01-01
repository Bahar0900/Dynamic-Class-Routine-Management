import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Use named import

const ProtectedRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth(); // Call useAuth hook
    return (
        <Route
            {...rest}
            element={isAuthenticated ? children : <Navigate to="/login" />}
        />
    );
};

export default ProtectedRoute;
