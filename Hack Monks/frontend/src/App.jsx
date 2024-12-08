import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeAuth } from './redux/slices/authSlice';
import Navbar from './components/Navbar';
import Stars from './components/Stars';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AboutUsPage from './pages/AboutUsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InstructorList from './pages/InstructorList';
import QuizPage from './pages/QuizPage';
import InstructorForm from './pages/InstructorForm';
import TransactionPage from './pages/TransactionPage';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const isUser = user && user.role === 'user'; // Check if the logged-in user is a regular user

  // Initialize authentication state
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Stars />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to={isUser ? '/dashboard' : '/'} /> : <SignupPage />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to={isUser ? '/dashboard' : '/'} /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/instructors"
          element={isLoggedIn && isUser ? <InstructorList /> : <Navigate to="/login" />}
        />
        <Route
          path="/transactions"
          element={isLoggedIn && isUser ? <TransactionPage /> : <Navigate to="/login" />}
        />
        <Route
  path="/transactions"
  element={isLoggedIn && isUser ? <Navigate to="/transactions" /> : <Navigate to="/login" />}
/>

        <Route
          path="/instructor-form"
          element={isLoggedIn && !isUser ? <InstructorForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/about-us"
          element ={<AboutUsPage />} 
        />
        <Route
          path="/quiz"
          element={isLoggedIn && isUser ? <QuizPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <ToastContainer
        className="custom-toast-container"
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;
