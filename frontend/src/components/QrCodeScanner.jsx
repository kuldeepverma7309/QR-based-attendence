import React, { useState, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import axios from 'axios';

function QRCodeScanner() {
  const [scanResult, setScanResult] = useState('');
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const markPresent = async () => {
    if (scanResult) {
      const parsedData = scanResult.split(',').reduce((acc, part) => {
        const [key, value] = part.split(':').map(item => item.trim());
        acc[key.toLowerCase().replace(/\s/g, '')] = value;
        return acc;
    }, {});
    
    const email = parsedData.email;
    const userId = parsedData.userid;
    const eventId = parsedData.event;
    const time = parsedData.time;
    const date = parsedData.date;
    console.log(userId, eventId, time, date);
    
      try {
        const res = await axios.post('http://localhost:5000/api/event/markPresent', {
         eventId,time,date
        },{withCredentials: true});
        if (res.data.success) {
          alert('Marked present successfully.');
        } else {
          alert('Error marking present.');
        }
      } catch (error) {
        console.error('Error marking present:', error);
        alert('Error marking present.');
      }
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = async () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          // Create a new instance of the ZXing MultiFormatReader
          const codeReader = new BrowserMultiFormatReader();
          try {
            const result = await codeReader.decodeFromImageElement(img);
            setScanResult(result.text);
            console.log('Scanned QR Code from Image:', result.text);
          } catch (error) {
            console.error('QR Scan Error:', error);
            setScanResult('No QR code found in the image.');
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = () => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.listVideoInputDevices().then((videoInputDevices) => {
      const firstDeviceId = videoInputDevices[0].deviceId;
      if (firstDeviceId) {
        codeReader.decodeOnceFromVideoDevice(firstDeviceId, videoRef.current).then((result) => {
          setScanResult(result.text);
          console.log('Scanned QR Code from Camera:', result.text);
        }).catch((error) => {
          console.error('QR Scan Error:', error);
          setScanResult('Error scanning QR code.');
        });
      }
    }).catch((error) => {
      console.error('Error accessing camera devices:', error);
    });
    setCameraEnabled(true);
  };

  const stopCamera = () => {
    setCameraEnabled(false);
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upload and Scan QR Code</h2>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Upload QR Code Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
      </div>
      <div>
        {cameraEnabled ? (
          <>
            <video ref={videoRef} style={{ width: '100%' }} autoPlay />
            <button onClick={stopCamera} className="mt-4 p-2 bg-red-500 text-white rounded">Stop Camera</button>
          </>
        ) : (
          <button onClick={startCamera} className="mt-4 p-2 bg-blue-500 text-white rounded">Start Camera</button>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {scanResult && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Scanned QR Code Data:</h3>
          {/* <p className="text-gray-800">{scanResult}</p> */}
          {/* mark present */}
          <button className="mt-4 p-2 bg-green-600 text-white rounded" onClick={markPresent}>Mark Present</button>
        </div>
      )}
    </div>
  );
}

export default QRCodeScanner;
