import React from 'react';

const HomePage = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://img.freepik.com/premium-photo/man-planting-plant-field_780838-564.jpg)', // Replace with your hero image URL
      }}
    >
      {/* Overlay to darken the background image */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content section */}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center text-white font-light tracking-widest px-2">
        {/* "Agri Mitra" Text in Dynamic Gradient with Animation */}
        <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-green-300 to-white-500 text-transparent bg-clip-text animate-text">
          Agri Mitra ಆಗ್ರಿ ಮಿತ್ರ
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
