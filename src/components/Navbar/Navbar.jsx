import React from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaTwitter } from "react-icons/fa";
import { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Navbar() {
  const { token, setToken } = useContext(UserContext);
  let navigate = useNavigate();

  function signout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-emerald-600 font-semibold transition duration-200"
      : "hover:text-emerald-600 transition duration-200";

  return (
    <nav className="border-gray-200 bg-slate-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container flex flex-wrap justify-center lg:justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className='flex items-center justify-between w-full lg:w-auto gap-3'>
          <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} width={110} className="h-8" alt="Flowbite Logo" />
          </NavLink>
          {token && (
            <ul className='flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium text-gray-500'>
              <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
              <li><NavLink to="/cart" className={navLinkClasses}>Cart</NavLink></li>
              <li><NavLink to="/products" className={navLinkClasses}>Products</NavLink></li>
              <li><NavLink to="/categories" className={navLinkClasses}>Categories</NavLink></li>
              <li><NavLink to="/brands" className={navLinkClasses}>Brands</NavLink></li>
            </ul>
          )}
        </div>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className="icons flex items-center space-x-4 rtl:space-x-reverse">
            <FaFacebook className="text-gray-600 hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="text-gray-600 hover:text-pink-500 cursor-pointer" />
            <FaYoutube className="text-gray-600 hover:text-red-600 cursor-pointer" />
            <FaTiktok className="text-gray-600 hover:text-black cursor-pointer" />
            <FaTwitter className="text-gray-600 hover:text-blue-400 cursor-pointer" />
          </div>
          <div className="links flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium text-gray-500">
            {!token && (
              <>
                <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
                <NavLink to="/register" className={navLinkClasses}>Register</NavLink>
              </>
            )}
            {token && (
              <span onClick={signout} className="cursor-pointer hover:text-red-500">
                SignOut
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
