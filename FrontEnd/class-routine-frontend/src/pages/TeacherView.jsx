import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const TeacherView = () => {
  const [teacherId, setTeacherId] = useState('');
  const [assignedClasses, setAssignedClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`/api/teacher/assigned-classes/${teacherId}`);
      setAssignedClasses(response.data);
    } catch (err) {
      alert('Error fetching assigned classes');
    }
  };

  return (
    <div>
      <h1>Teacher View</h1>
      <input
        type="text"
        placeholder="Teacher ID"
        value={teacherId}
        onChange={(e) => setTeacherId(e.target.value)}
      />
      <button onClick={fetchClasses}>Get Assigned Classes</button>
      <ul>
        {assignedClasses.map((lab) => (
          <li key={lab.id}>{lab.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherView;