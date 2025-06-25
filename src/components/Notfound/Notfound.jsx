import React from 'react';
import NotFoundImage from '../../assets/error.svg'; // Assuming you have a not found image
import { Link } from 'react-router-dom';
export default function Notfound() {


  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img src={NotFoundImage} alt="Page Not Found" className="w-1/2 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h1>
        <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
      </div>
      <div className="flex justify-center mt-4">
        <Link to="/" className="text-blue-500 hover:underline">Go to Home</Link>
      </div>
    </>
  );
}