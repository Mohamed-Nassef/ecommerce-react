import React from 'react';
import styles from './Brands.module.css';
import { Link } from 'react-router-dom';

export default function Brands() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 to-white text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-emerald-600 mb-4 animate-bounce">🚧 Coming Soon 🚧</h1>
      <p className="text-gray-600 text-lg mb-6">
        This page is under construction. We're working hard to bring it to life!
      </p>
      <Link
        to="/"
        className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}