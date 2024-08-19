import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUser } from '../redux/slices/user';
import UsersTable from '../components/UserTable';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';

const GetStudents = () => {
    const { allUser } = useSelector(store => store.user);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const [path, setPath] = useState('');
    const location = useLocation();
    const pathName = location.pathname;

    useEffect(() => {
        setPath(pathName);
    }, [pathName]);

    useEffect(() => {
        // Fetch users from your backend
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/getAllUsers', {
                    withCredentials: true
                });
                dispatch(setAllUser(res.data.users));
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, [dispatch]);

    return (
        <div className="flex w-[90vw] bg-slate-900 overflow-x-hidden">
            <Sidebar setPath={setPath} path={path} pathName={pathName} />
            <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Students List</h2>
                <UsersTable users={allUser} />
            </div>
        </div>
    );
};

export default GetStudents;