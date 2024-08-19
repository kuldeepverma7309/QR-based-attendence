import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UsersInEventChart = () => {
  const { events } = useSelector(store => store.event);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [usersPresent, setUsersPresent] = useState(0);
  const [path, setPath] = useState('');
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
      setPath(pathName);
  }, [pathName]);
  useEffect(() => {
    if (selectedEvent) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/event/getUsersPresentInEvent/${selectedEvent}`, { withCredentials: true });
          setUsersPresent(response.data.usersPresent);
          console.log(response.data.usersPresent);
        } catch (error) {
          console.error("Error fetching users present:", error);
        }
      };

      fetchData();
    }
  }, [selectedEvent]);

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const data = {
    labels: ['Event Attendance'],
    datasets: [
      {
        label: 'Users Present',
        data: [usersPresent],
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="flex w-[90vw] bg-slate-900 overflow-x-hidden">
            <Sidebar setPath={setPath} path={path} pathName={pathName} />
      <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Users Present in Event</h2>
        <select value={selectedEvent} onChange={handleEventChange} className="mb-4 p-2 border rounded">
          {events.map(event => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default UsersInEventChart;