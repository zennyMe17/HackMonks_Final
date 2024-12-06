import React from "react";

const CircularRotatingText = () => {
  const styles = `
    .rotating-circle {
      position: absolute;
      bottom: -90px; /* Adjusted to make half visible */
      left: 50px;  /* Moved slightly towards the right */
      width: 250px; /* Reduced size for smaller circle */
      height: 250px;
    }

    .rotating-circle svg {
      width: 100%;
      height: 100%;
      animation: rotate-text 10s linear infinite;
    }

    .rotating-circle text {
      opacity:0.5;
      font-size: 10px; /* Adjusted font size for better fit */
      font-weight: bold;
      text-anchor: middle;
      fill: url(#gradientText); /* Use gradient fill */
    }

    @keyframes rotate-text {
      0% {
        transform: rotate(360deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="rotating-circle">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path
              id="rotatingTextPath"
              d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
            ></path>
            {/* Define the gradient */}
            <linearGradient id="gradientText" gradientUnits="userSpaceOnUse" x1="0" x2="100%" y1="0" y2="0">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="#38495a" />
            </linearGradient>
          </defs>
          <text>
            <textPath xlinkHref="#rotatingTextPath" textLength="420">
              CodeMonks - Almost Humans! CodeMonks - Almost Humans!
            </textPath>
          </text>
        </svg>
      </div>
    </>
  );
};

export default CircularRotatingText;
