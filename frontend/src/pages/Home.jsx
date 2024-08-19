import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='w-full bg-slate-900 h-screen flex mx-auto'>
      <div className='flex flex-col justify-center items-center mx-auto w-10/12'>
        <h1 className='text-5xl font-bold text-white mb-4'>Welcome to QRCodeAttend</h1>
        <p className='text-lg text-white mb-8 text-center'>
          Streamline your attendance tracking with our dynamic QR code system. Generate event-specific QR codes and ensure accurate, proxy-free attendance records.
        </p>
        {/* <div className='flex space-x-4'>
          <Link to="/generate-qr" className='bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700'>
            Generate QR Code
          </Link>
          <Link to="/attendance" className='bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700'>
            Mark Attendance
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Home;