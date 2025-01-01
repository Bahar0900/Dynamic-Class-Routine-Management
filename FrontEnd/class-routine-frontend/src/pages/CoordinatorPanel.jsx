import React, { useState } from 'react';
import axios from '../utils/axios';

const CoordinatorPanel = () => {
  const [labId, setLabId] = useState('');
  const [labAssistantId, setLabAssistantId] = useState('');

  const assignLab = async () => {
    try {
      await axios.post('/api/coordinator/assign-lab', { labId, labAssistantId });
      alert('Lab assigned successfully');
    } catch (err) {
      alert('Error assigning lab');
    }
  };

  return (
    <div>
      <h1>Coordinator Panel</h1>
      <input
        type="text"
        placeholder="Lab ID"
        value={labId}
        onChange={(e) => setLabId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lab Assistant ID"
        value={labAssistantId}
        onChange={(e) => setLabAssistantId(e.target.value)}
      />
      <button onClick={assignLab}>Assign Lab</button>
    </div>
  );
};

export default CoordinatorPanel;