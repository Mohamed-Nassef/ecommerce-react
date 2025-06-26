import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import logo from '../../assets/freshcart-logo.svg';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaTwitter } from "react-icons/fa";

export default function Navbar() {
  // Using useContext to access the UserContext
  const { token, setToken, name, setName } = useContext(UserContext);
  const navigate = useNavigate();
  // State to manage the open/close state of the mobile menu and user menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Function to handle sign out
  // This function will remove the user token and name from localStorage
  function signout() {
    localStorage.removeItem("userToken");
    setToken(null);
    localStorage.removeItem("userName");
    setName(null);
    setUserMenuOpen(false);
    navigate("/login");
  }

  // Function to generate classes for navigation links based on active state
  // This function will return different classes based on whether the link is active or not
  // It will be used to style the links in the navigation bar
  const navLinkClasses = ({ isActive }) =>
    isActive ? "text-emerald-600 font-semibold transition duration-200" : "hover:text-emerald-600 transition duration-200";

  return (
    <nav className="bg-slate-200 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} width={110} alt="Logo" />
        </NavLink>

        {/* Mobile Menu Button */}
        {/* This button will toggle the mobile menu open/close state */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>


        {/* Desktop Navigation Links */}
        {/* These links will be displayed on larger screens */}
        {/* They will only be visible when the user is logged in */}
        {/* The links will use NavLink to apply active styles when the link is active */}

        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
          {token && (
            <>
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
              <NavLink to="/cart" className={navLinkClasses}>Cart</NavLink>
              <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
              <NavLink to="/categories" className={navLinkClasses}>Categories</NavLink>
              <NavLink to="/brands" className={navLinkClasses}>Brands</NavLink>
            </>
          )}
        </div>

        {/* Social + Auth */}
        <div className="hidden lg:flex items-center gap-4 text-gray-600 text-xl">
          <FaFacebook className="hover:text-blue-600 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaYoutube className="hover:text-red-600 cursor-pointer" />
          <FaTiktok className="hover:text-black cursor-pointer" />
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />

          <div className="ml-4 relative">
            {!token ? (
              <div className="flex gap-4 text-sm">
                <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
                <NavLink to="/register" className={navLinkClasses}>Register</NavLink>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1 text-sm hover:text-emerald-600 cursor-pointer"
                >
                  👤 {name}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded border text-sm text-gray-700 z-50">
                    <li><NavLink to="/" className="block px-4 py-2 hover:bg-gray-100">Profile</NavLink></li>
                    <li><NavLink to="/cart" className="block px-4 py-2 hover:bg-gray-100">Orders</NavLink></li>
                    <li><button onClick={signout} className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Sign Out</button></li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2 text-sm font-medium text-gray-700">
          {token && (
            <>
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
              <NavLink to="/cart" className={navLinkClasses}>Cart</NavLink>
              <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
              <NavLink to="/categories" className={navLinkClasses}>Categories</NavLink>
              <NavLink to="/brands" className={navLinkClasses}>Brands</NavLink>
            </>
          )}
          {!token ? (
            <>
              <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
              <NavLink to="/register" className={navLinkClasses}>Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className={navLinkClasses}>Profile</NavLink>
              <NavLink to="/cart" className={navLinkClasses}>Orders</NavLink>
              <button onClick={signout} className="text-red-600 hover:text-red-800 cursor-pointer">Sign Out</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
