import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom';

const EventsByTypeChart = () => {
    const [eventData, setEventData] = useState([]);
    const [path, setPath] = useState('');
    const location = useLocation();
    const pathName = location.pathname;

    useEffect(() => {
        setPath(pathName);
    }, [pathName]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/event/getNumberOfEventsByType', { withCredentials: true });
                console.log(response.data)
                setEventData(response.data.eventsByType || []);
            } catch (error) {
                console.error("Error fetching event data:", error);
                setEventData([]);
            }
        };

        fetchData();
    }, []);

    const data = {
        labels: eventData.map(event => event._id),
        datasets: [
            {
                data: eventData.map(event => event.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    return (
        <div className="flex w-[90vw] bg-slate-900 overflow-x-hidden">
            <Sidebar setPath={setPath} path={path} pathName={pathName} />
            <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Number of Events by Type</h2>
                {eventData.length > 0 ? (
                    <Pie data={data} />
                ) : (
                    <p className="text-center text-gray-800">No data available</p>
                )}
            </div>
        </div>
    );
};

export default EventsByTypeChart;