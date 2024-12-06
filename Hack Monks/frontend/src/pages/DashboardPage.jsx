import React from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaChalkboardTeacher } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import Stars from '../components/Stars'; // Import the Stars component

const DashboardPage = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="relative min-h-screen w-full">
      {/* Stars Background */}
      <Stars />

      {/* User Details Card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
        <div className="p-8 bg-gray-800 rounded-xl shadow-lg w-10/12 max-w-2xl text-center mx-auto">
          {/* User Avatar */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-700 p-4 rounded-full">
              <span className="text-blue-400 text-6xl font-bold uppercase">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* User Role */}
          <h2 className="text-xl font-semibold text-white capitalize">
            Role: {user.role}
          </h2>

          {/* User Email */}
          <p className="text-gray-400 text-sm mt-1">{user.email}</p>

          {/* Divider */}
          <hr className="my-6 border-gray-700" />

          {/* Additional Info */}
          <p className="text-lg text-gray-300">
            Welcome, <span className="text-blue-500 font-bold">{user.name}</span>!
          </p>

          {/* Action Button */}
          <button
            className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={() => alert('Features coming soon!')}
          >
            Explore Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
