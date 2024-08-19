import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar'; // Ensure you have this component
import { useLocation } from 'react-router-dom';

const TotalEvents = () => {
    const [events, setEvents] = useState([]);
    const [path, setPath] = useState('');
    const location = useLocation();
    const pathName = location.pathname;

    useEffect(() => {
        setPath(pathName);
    }, [pathName]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/event/getTotalNoOfEvents', { withCredentials: true });
                setEvents(response.data.transformedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex w-[90vw] bg-slate-900 overflow-x-hidden min-h-screen">
            <Sidebar setPath={setPath} path={path} pathName={pathName} />
            <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Total Number of Events</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Number of Present Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b text-center">{event.title}</td>
                                <td className="py-2 px-4 border-b text-center">{event.description}</td>
                                <td className="py-2 px-4 border-b text-center">{event.noOfPresentUsers}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TotalEvents;