import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setUser } from '../redux/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(store => store.user)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true })
        if (res.data.success) {
            dispatch(setUser(res.data.result))
            navigate('/qrattendence')
        }
    }

    useEffect(()=>{
        if(user !== null){
            navigate('/qrattendence')
        }
    })

    return (
        <div className='w-full bg-slate-900 h-screen flex mx-auto'>
            <div className='flex items-center justify-center flex-col w-full'>
                <div className='w-[40%]'>
                    <h1 className='text-5xl font-bold text-white mb-4 text-center'>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-4'>
                            <input type='email' placeholder='Email' className='bg-slate-800 text-white px-4 py-2 rounded-lg' onChange={(e) => setEmail(e.target.value)} />
                            <input type='password' placeholder='Password' className='bg-slate-800 text-white px-4 py-2 rounded-lg' onChange={(e) => setPassword(e.target.value)} />
                            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>Login</button>
                        </div>
                        <span className='text-sm text-blue-900 font-semibold'>If not account then <Link to={'/signup'} className='hover:text-blue-600'>SignUp</Link></span>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login