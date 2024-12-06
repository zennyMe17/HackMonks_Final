export const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      stars.push(`${x}px ${y}px #FFF`);
    }
    return stars.join(', ');
  };
  