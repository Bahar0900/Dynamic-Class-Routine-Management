import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.role})</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;