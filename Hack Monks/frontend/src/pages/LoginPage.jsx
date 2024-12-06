import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { loginUser } from '../services/api';
import { FaEnvelope, FaLock, FaUserAlt, FaChalkboardTeacher, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(formData);
      dispatch(login(user));
      toast.success('Login Successful!', { icon: <FaLock /> });
    } catch (error) {
      toast.error(error.message || 'Login Failed', { icon: <FaLock /> });
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <form className="p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>

        <div className="mb-4 flex items-center bg-gray-700 rounded-lg">
          <FaEnvelope className="text-gray-400 mx-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white focus:outline-none focus:bg-gray-700 focus:shadow-none rounded-r-lg"
            required
          />
        </div>

        <div className="mb-4 flex items-center bg-gray-700 rounded-lg relative">
          <FaLock className="text-gray-400 mx-3" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white focus:outline-none focus:bg-gray-700 focus:shadow-none rounded-r-lg"
            required
          />
          <button
            type="button"
            className="absolute right-3 text-gray-400"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="mb-4 relative w-full flex justify-center items-center bg-gray-700 rounded-lg overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-white bg-opacity-20 rounded-lg transition-transform duration-300 ease-in-out ${
              formData.role === 'user' ? 'translate-x-0' : 'translate-x-full'
            }`}
          ></div>

          <button
            type="button"
            className={`relative w-1/2 p-3 text-white z-10 flex items-center justify-center gap-2 ${
              formData.role === 'user' ? 'font-semibold' : 'font-normal'
            }`}
            onClick={() => handleRoleChange('user')}
          >
            <FaUserAlt /> User
          </button>

          <button
            type="button"
            className={`relative w-1/2 p-3 text-white z-10 flex items-center justify-center gap-2 ${
              formData.role === 'instructor' ? 'font-semibold' : 'font-normal'
            }`}
            onClick={() => handleRoleChange('instructor')}
          >
            <FaChalkboardTeacher /> Instructor
          </button>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transform transition duration-300 ease-in-out flex items-center justify-center gap-2"
          onClick={handleLogin}
        >
          <FaLock /> Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
