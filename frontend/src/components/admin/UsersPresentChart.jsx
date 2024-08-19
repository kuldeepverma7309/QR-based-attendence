import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom';

// Register the necessary components
Chart.register(ArcElement, Tooltip, Legend);

const UsersPresentChart = () => {
    const [totalUsersPresent, setTotalUsersPresent] = useState(0);
    const [path, setPath] = useState('');
    const location = useLocation();
    const pathName = location.pathname;

    useEffect(() => {
        setPath(pathName);
    }, [pathName]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/event/getNumberOfUsersPresent', { withCredentials: true });
            setTotalUsersPresent(response.data.totalUsersPresent);
        };

        fetchData();
    }, []);

    const data = {
        labels: ['Users Present', 'Absent'],
        datasets: [
            {
                data: [totalUsersPresent, 100 - totalUsersPresent],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    return (
        <div className="flex w-[90vw] bg-slate-900 overflow-x-hidden">
            <Sidebar setPath={setPath} path={path} pathName={pathName} />
            <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Number of Users Present</h2>
                <Doughnut data={data} />
            </div>
        </div>
    );
};

export default UsersPresentChart;