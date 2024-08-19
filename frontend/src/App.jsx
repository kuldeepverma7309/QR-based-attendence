import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import QrAttendence from './pages/QrAttendence';
import Signup from './pages/Signup';
import { setUser } from './redux/slices/user';
import CreateEvent from './components/admin/CreateEvent';
import GetStudents from './pages/GetStudents';
import { setEvents } from './redux/slices/event';
import UsersPresentChart from './components/admin/UsersPresentChart';
import EventParticipationOverTimeChart from './components/admin/EventParticipationOverTimeChart';
import TotalEvents from './components/admin/TotalEvents';
import UsersInEventChart from './components/admin/UsersInEventChart';
import EventsByTypeChart from './components/admin/EventsByTypeChart';
import AttendanceByRoleChart from './components/admin/AttendanceByRoleChart';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

  const { user } = useSelector(store => store.user);
  const { events } = useSelector(store => store.event);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('http://localhost:5000/api/auth/get-user', {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
      }
    };
    fetchUser();
  }, [dispatch]); // Include dispatch in the dependency array


  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('http://localhost:5000/api/event/getAllEvents', {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setEvents(res.data.events));
      }
    };
    fetchEvents();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login user={user} events={events} />} />
    <Route path='/signup' element={<Signup user={user} events={events} />} />
    <Route path='/qrattendence' element={<ProtectedRoute><QrAttendence user={user} events={events} /></ProtectedRoute>} />
    <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path='/create-event' element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
    <Route path='/get-students' element={<ProtectedRoute><GetStudents /></ProtectedRoute>} />
    <Route path="/users-present" element={<ProtectedRoute><UsersPresentChart /></ProtectedRoute>} />
    <Route path="/events-by-type" element={<ProtectedRoute><EventsByTypeChart /></ProtectedRoute>} />
    <Route path="/users-in-event" element={<ProtectedRoute><UsersInEventChart /></ProtectedRoute>} />
    <Route path="/total-events" element={<ProtectedRoute><TotalEvents /></ProtectedRoute>} />
    <Route path="/event-participation-over-time" element={<ProtectedRoute><EventParticipationOverTimeChart /></ProtectedRoute>} />
    <Route path='*' element={<NotFound />} />
</Routes>
    </BrowserRouter>
  );
};

export default App;