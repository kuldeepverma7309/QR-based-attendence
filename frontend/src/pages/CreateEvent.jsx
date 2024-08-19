import axios from 'axios';
import React, { useState } from 'react';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/event/create', {title, description, date, time});
        if (res.data.success) {
            alert('Event created successfully');
        }
        } catch (error) {
            console.log(error);
            
        }
        
    };

    return (
        <div className="w-full h-auto pt-5 bg-slate-900 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Create Event</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                            Event Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter event title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter event description"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                            Time
                        </label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
