import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const LabAssistantView = () => {
  const [myLabs, setMyLabs] = useState([]);

  useEffect(() => {
    const fetchMyLabs = async () => {
      try {
        const response = await axios.get('/api/lab-assistant/my-labs');
        setMyLabs(response.data);
      } catch (err) {
        alert('Error fetching labs');
      }
    };
    fetchMyLabs();
  }, []);

  return (
    <div>
      <h1>My Labs</h1>
      <ul>
        {myLabs.map((lab) => (
          <li key={lab.id}>{lab.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LabAssistantView;