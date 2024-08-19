import React from 'react';
import axios from 'axios';

const QrCodeGenerator = ({ user, events = [] }) => {
  const [username, setUsername] = React.useState('');
  const [qrCodeImageUrl, setQrCodeImageUrl] = React.useState('');
  const [event, setEvent] = React.useState('');


  const handleGenerateQRCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/qrcode/generate-qr', {
        email: username,
        event: event
      },{withCredentials: true});
      setQrCodeImageUrl(response.data.qrCodeImageUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      setQrCodeImageUrl('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Generate QR Code</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="text"
          placeholder="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event">
          Event
        </label>
        <select
          id="event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {events.map((event,i) => (
            <option key={event?._id} value={i=== 0? 0: event._id}>
              {i === 0 ? 'Select an event' : event.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={handleGenerateQRCode}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate QR Code
        </button>
      </div>
      {qrCodeImageUrl && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-bold mb-2">Your QR Code:</h3>
          <img src={qrCodeImageUrl} alt="Generated QR Code" className="mx-auto" />
          <div className="mt-4">
            <a
              href={qrCodeImageUrl}
              download="qrcode.png"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Download QR Code
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;
