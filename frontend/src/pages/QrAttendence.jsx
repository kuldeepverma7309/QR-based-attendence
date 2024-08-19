import React from 'react';
import QrCodeGenerator from '../components/QrCodeGenerator';
import QrCodeScanner from '../components/QrCodeScanner';

const QrAttendence = ({user,events}) => {
  return (
    <div className='w-full bg-slate-900 h-screen mx-auto p-8'>
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Mark Your Attendence</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Generate QR Code</h2>
          <p className="text-gray-700 mb-4">
            Create unique QR codes for your events or profiles. Simply enter the required information and generate your QR code instantly.
          </p>
          <QrCodeGenerator user={user} events={events} />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>
          <p className="text-gray-700 mb-4">
            Scan QR codes to mark attendance quickly and efficiently. Ensure accurate and proxy-free attendance records.
          </p>
          <QrCodeScanner />
        </div>
      </div>
    </div>
  );
};

export default QrAttendence;