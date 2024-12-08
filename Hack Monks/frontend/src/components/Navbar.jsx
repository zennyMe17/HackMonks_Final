import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import logo from '../assets/brand_logo.png';
import { toast } from 'react-toastify'; 
import { FaLock } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  // Handle scroll to toggle navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.error('Logged out Successfully!', { icon: <FaLock /> });
  };

  const getHighlightClass = (path) =>
    location.pathname === path
      ? 'text-blue-300 font-bold'
      : 'text-white hover:text-gray-300';

  const isUser = user && user.role === 'user';
  const isInstructor = user && user.role === 'instructor';

  return (
    <nav
      className={`bg-transparent fixed top-0 left-0 right-0 p-4 z-10 w-10/12 mx-auto transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
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
          {isLoggedIn && isUser && (
            <>
              <Link
                to="/instructors"
                className={`text-xl font-semibold font-sans ${getHighlightClass('/instructors')}`}
              >
                Agri Mitra Santhe
              </Link>
              <Link
                to="/transactions"
                className={`text-xl font-semibold font-sans ${getHighlightClass('/transactions')}`}
              >
                Tutorials
              </Link>
            </>
          )}
          {isLoggedIn && !isUser && (
            <>
              <Link
                to="/instructor-form"
                className={`text-xl font-semibold font-sans ${getHighlightClass('/instructor-form')}`}
              >
                Santhe
              </Link>
            </>
          )}
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
