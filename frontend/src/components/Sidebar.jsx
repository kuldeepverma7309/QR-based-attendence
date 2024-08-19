import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ setPath, path }) => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <ul className="mt-6">
        <li className={`${path === '/users-present' ? "bg-gray-700" : ""} px-4 py-2 hover:bg-gray-700`} onClick={() => setPath('/users-present')}>
          <Link to="/users-present">Users Present</Link>
        </li>
        <li className={`${path === '/events-by-type' ? "bg-gray-700" : ""} px-4 py-2 hover:bg-gray-700`} onClick={() => setPath("/events-by-type")}>
          <Link to="/events-by-type">Events by Type</Link>
        </li>
        <li className={`${path === '/users-in-event' ? "bg-gray-700" : ""} px-4 py-2 hover:bg-gray-700`} onClick={() => setPath("/users-in-event")}>
          <Link to="/users-in-event">Users in Event</Link>
        </li>
        <li className={`${path === '/total-events' ? "bg-gray-700" : ""} px-4 py-2 hover:bg-gray-700`} onClick={() => setPath("/total-events")}>
          <Link to="/total-events">Total Events</Link>
        </li>
        <li className={`${path === '/event-participation-over-time' ? "bg-gray-700" : ""} px-4 py-2 hover:bg-gray-700`} onClick={() => setPath("/event-participation-over-time")}>
          <Link to="/event-participation-over-time">Event Participation Over Time</Link>
        </li>
        <li className={`${path === '/create-event' ? "bg-gray-700" : ""} px-4 py-2 hover:bg-gray-700`} onClick={() => setPath('/create-event')}>
          <Link to={'/create-event'}>Create Event</Link>
        </li>
        <li className={`${path === '/get-students' ? "bg-gray-700" : ""} px-4 py-2 hover:bg-gray-700`} onClick={() => setPath('/get-students')}>
          <Link to={'/get-students'}>Get All Students</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;