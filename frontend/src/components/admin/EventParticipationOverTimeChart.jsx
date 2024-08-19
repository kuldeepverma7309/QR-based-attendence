import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EventParticipationOverTimeChart = () => {
    const [participationData, setParticipationData] = useState([]);
    const [path, setPath] = useState('');
    const location = useLocation();
    const pathName = location.pathname;

    useEffect(() => {
        setPath(pathName);
    }, [pathName]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/event/getEventParticipationOverTime', { withCredentials: true });
                setParticipationData(response.data.participationOverTime);
            } catch (error) {
                console.error("Error fetching participation data:", error);
            }
        };

        fetchData();
    }, []);

    const data = {
        labels: participationData.map(event => event._id),
        datasets: [
            {
                label: 'Participants Over Time',
                data: participationData.map(event => event.totalParticipants),
                fill: false,
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
            },
        ],
    };

    return (
        <div className="flex w-[90vw] bg-slate-900 overflow-x-hidden">
            <Sidebar setPath={setPath} path={path} pathName={pathName} />
            <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Event Participation Over Time</h2>
                <Line data={data} />
            </div>
        </div>
    );
};

export default EventParticipationOverTimeChart;