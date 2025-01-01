import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Corrected import to use useAuth

const RoleBasedRoute = ({ roles, children, ...rest }) => {
    const { user } = useAuth(); // Corrected hook to useAuth

    return (
        <Route
            {...rest}
            element={user && roles.includes(user.role) ? children : <Navigate to="/unauthorized" />}
        />
    );
};

export default RoleBasedRoute;
