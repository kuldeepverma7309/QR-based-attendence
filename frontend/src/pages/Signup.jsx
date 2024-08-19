import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/slices/user'


const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(store => store.user)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassowrd, setConfirmPassword] = useState()
    const handleSubmit = async(e) => {
        e.preventDefault()
       try {
        console.log(email, password,name,confirmPassowrd)
        const res = await axios.post('http://localhost:5000/api/auth/register', {name, email, password, confirmPassword: confirmPassowrd},{
            withCredentials: true,
          })
        if(res.data.success){
            dispatch(setUser(res.data.result))
            navigate('/qrattendence')
        }
       } catch (error) {
              console.log(error)
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
                        <div className='flex flex-col gap-4 mb-3'>
                            <input type="text" placeholder='Name' className='bg-slate-800 text-white px-4 py-2 rounded-lg' onChange={(e)=> setName(e.target.value)}/>
                            <input type='email' placeholder='Email' className='bg-slate-800 text-white px-4 py-2 rounded-lg' onChange={(e)=>setEmail(e.target.value)}/>
                            <input type='password' placeholder='Password' className='bg-slate-800 text-white px-4 py-2 rounded-lg' onChange={(e)=>setPassword(e.target.value)}/>
                            <input type='password' placeholder='Confirm Password' className='bg-slate-800 text-white px-4 py-2 rounded-lg' onChange={(e)=> setConfirmPassword(e.target.value)}/>

                            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>Signup</button>
                        </div>
                        <Link to={'/login'} className='text-sm p-2 mt-3 font-semibold hover:shadow-md  text-green-700 hover:text-white hover:bg-green-600'>have already account Login</Link>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signup