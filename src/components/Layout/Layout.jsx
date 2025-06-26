import React from 'react';
import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-[80px] container mx-auto px-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>

  );
}