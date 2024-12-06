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
import ChatbotPage from './pages/ChatbotPage';
import QuizPage from './pages/QuizPage';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

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
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignupPage />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chatbot"
          element={isLoggedIn ? <ChatbotPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/about-us"
          element={isLoggedIn ? <AboutUsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/quiz"
          element={isLoggedIn ? <QuizPage /> : <Navigate to="/login" />}
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
