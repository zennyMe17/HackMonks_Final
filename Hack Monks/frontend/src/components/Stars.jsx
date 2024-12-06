import React from 'react';
import { generateStars } from '../utils/starUtils';
import CircularRotatingText from './CircularRotatingText';

const Stars = () => {
  const smallStars = generateStars(700);
  const mediumStars = generateStars(200);
  const bigStars = generateStars(100);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#1B2735] to-[#090A0F]">
      {/* Small Stars */}
      <div
        className="absolute top-0 left-0 right-0 animate-star"
        style={{ width: '1px', height: '1px', boxShadow: smallStars }}
      ></div>

      {/* Medium Stars */}
      <div
        className="absolute top-0 left-0 right-0 animate-star2"
        style={{ width: '2px', height: '2px', boxShadow: mediumStars }}
      ></div>

      {/* Big Stars */}
      <div
        className="absolute top-0 left-0 right-0 animate-star3"
        style={{ width: '3px', height: '3px', boxShadow: bigStars }}
      ></div>
      <CircularRotatingText/>
    </div>
  );
};

export default Stars;