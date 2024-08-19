import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { clearUser } from '../redux/slices/user';
import axios from 'axios';

const Header = () => {
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const handleLogout = async() => {
        const res = await axios.get('http://localhost:5000/api/auth/logout', {
            withCredentials: true
        });
        if(res.data.success){
            dispatch(clearUser())
            window.location.href = '/';
        }
    }
    return (
        <div className='w-full flex items-center justify-center bg-slate-800 shadow-lg'>
            <nav className='flex items-center justify-center w-full max-w-4xl gap-3 '>
                <Link to='/' className='text-white px-6 py-3 rounded-lg hover:bg-blue-700'>Home</Link>
                {
                    user !== null ? (

                        <button className='text-white px-6 py-3 rounded-lg hover:bg-blue-700' onClick={handleLogout}>Logout</button>
                    ):(
                        <>
                        <Link to='/login' className='text-white px-6 py-3 rounded-lg hover:bg-blue-700'>Login</Link>
                        <Link to='/signup' className='text-white px-6 py-3 rounded-lg hover:bg-blue-700'>Signup</Link>
                        </>
                    )
                }
                {
                    user && user.role === 'admin' && (
                        <Link to='/dashboard' className='text-white px-6 py-3 rounded-lg hover:bg-blue-700'>Dashboard</Link>
                    )
                }
                <Link to='/qrattendence' className='text-white px-6 py-3 rounded-lg hover:bg-blue-700'>QrAttendence</Link>
            </nav>
        </div>
    )
}

export default Header