import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import logo from '../../assets/freshcart-logo.svg';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaTwitter } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  const { token, setToken, name, setName, email, setEmail } = useContext(UserContext);
  const { cartcount } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function signout() {
    localStorage.removeItem("userToken");
    setToken(null);
    localStorage.removeItem("userName");
    setName(null);
    localStorage.removeItem("userEmail");
    setEmail(null);
    navigate("/login");
  }

  const navLinkClasses = ({ isActive }) =>
    isActive ? "text-emerald-600 font-semibold transition duration-200 block" : "hover:text-emerald-600 transition duration-200 block";

  return (
    <nav className="bg-slate-200 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Cart Icon with count */}
          {token && (
            <NavLink to="/cart" className="relative text-gray-700 hover:text-emerald-600 text-xl">
              <FiShoppingCart />
              {cartcount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartcount}
                </span>
              )}
            </NavLink>
          )}

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} width={110} alt="Logo" />
          </NavLink>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

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

        <div className="hidden lg:flex items-center gap-4 text-gray-600 text-xl">
          <FaFacebook className="hover:text-blue-600 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaYoutube className="hover:text-red-600 cursor-pointer" />
          <FaTiktok className="hover:text-black cursor-pointer" />
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />

          {token ? (
            <button onClick={signout} className="text-sm text-red-600 hover:text-red-800 ml-4 cursor-pointer">Sign Out</button>
          ) : (
            <div className="flex gap-4 text-sm">
              <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
              <NavLink to="/register" className={navLinkClasses}>Register</NavLink>
            </div>
          )}
        </div>
      </div>

      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} px-4 pb-4 text-sm font-medium text-gray-700 flex flex-col space-y-2`}>
        {token && (
          <>
            <NavLink to="/" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/cart" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Cart</NavLink>
            <NavLink to="/products" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Products</NavLink>
            <NavLink to="/categories" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Categories</NavLink>
            <NavLink to="/brands" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Brands</NavLink>
          </>
        )}
        {!token ? (
          <>
            <NavLink to="/login" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Login</NavLink>
            <NavLink to="/register" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Register</NavLink>
          </>
        ) : (
          <button onClick={() => { signout(); setMenuOpen(false); }} className="text-red-600 hover:text-red-800 cursor-pointer">Sign Out</button>
        )}
      </div>
    </nav>
  );
}
