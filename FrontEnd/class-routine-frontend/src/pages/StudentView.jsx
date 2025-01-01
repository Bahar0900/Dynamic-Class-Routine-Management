import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const StudentView = () => {
  const [batchId, setBatchId] = useState('');
  const [schedule, setSchedule] = useState([]);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`/api/student/schedule/${batchId}`);
      setSchedule(response.data);
    } catch (err) {
      alert('Error fetching schedule');
    }
  };

  return (
    <div>
      <h1>Student Schedule</h1>
      <input
        type="text"
        placeholder="Batch ID"
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
      />
      <button onClick={fetchSchedule}>Get Schedule</button>
      <ul>
        {schedule.map((routine) => (
          <li key={routine.id}>{routine.subject.name} - {routine.lab.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentView;