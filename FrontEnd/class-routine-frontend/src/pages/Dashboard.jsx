import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { authData } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {authData?.user?.name}</h1>
      <p>Role: {authData?.user?.role}</p>
    </div>
  );
};

export default Dashboard;