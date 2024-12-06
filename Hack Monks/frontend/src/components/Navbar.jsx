import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import logo from '../assets/brand_logo.png';
import { toast } from 'react-toastify'; 
import { FaLock } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth); // Get the user object from Redux
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.error('Logged out Successfully!', { icon: <FaLock /> });
  };

  const getHighlightClass = (path) =>
    location.pathname === path
      ? 'text-blue-300 font-bold' // Active link color
      : 'text-white hover:text-gray-300'; // Default link color and hover effect

  const isUser = user && user.role === 'user'; // Check if the logged-in user is a regular user
  const isInstructor = user && user.role === 'instructor'; // Check if the logged-in user is an instructor

  return (
    <nav className="bg-transparent fixed top-0 left-0 right-0 p-4 z-10 w-10/12 mx-auto">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Brand Logo" className="h-14 w-auto opacity-80" />
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className={`text-xl font-semibold font-sans ${getHighlightClass('/')}`}
          >
            Home
          </Link>

          <Link
                to="/about-us"
                className={`text-xl font-semibold font-sans ${getHighlightClass('/about-us')}`}
              >
                About Us
              </Link>

          {/* Links for regular users */}
          {isLoggedIn && isUser && (
            <>
              
              <Link
                to="/chatbot"
                className={`text-xl font-semibold font-sans ${getHighlightClass('/chatbot')}`}
              >
                Chatbot
              </Link>
              
            </>
          )}

{isLoggedIn && !isUser && (
            <>
              
              <Link
                to="/dummy"
                className={`text-xl font-semibold font-sans ${getHighlightClass('/chatbot')}`}
              >
                Dummy
              </Link>
              
            </>
          )}
          

          {/* Links for instructors and non-user roles */}
          
        </div>

        {/* Login/Signup or Dashboard/Logout Buttons */}
        <div className="flex space-x-4 items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-white text-xl font-semibold font-sans border border-white px-3 py-1.5 rounded-lg transition hover:shadow-[0px_0px_10px_2px_rgba(59,130,246,0.6)]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white text-xl font-semibold font-sans border border-white px-3 py-1.5 rounded-lg transition hover:shadow-[0px_0px_10px_2px_rgba(45,212,191,0.6)]"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
             <Link
                to="/dashboard"
                className="text-white text-xl font-semibold font-sans border border-white px-3 py-1.5 rounded-lg transition hover:shadow-[0px_0px_10px_2px_rgba(59,130,246,0.6)]"
              >
                Dashboard
              </Link>
              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="text-white text-xl font-semibold font-sans border border-white px-3 py-1.5 rounded-lg transition hover:shadow-[0px_0px_10px_2px_rgba(220,38,38,0.6)]"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
