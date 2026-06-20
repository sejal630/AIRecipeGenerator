import React, { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  "Preheating the creative oven...",
  "Whisking up some ideas...",
  "Chopping fresh ingredients...",
  "Stirring the pot...",
  "Simmering your recipe...",
  "Plating the details...",
  "Adding a pinch of seasoning..."
];

export default function Loader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container glass-card" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div className="pan-wrapper">
        <div className="pan-shadow"></div>
        <div className="food-bubble"></div>
        <div className="food-bubble"></div>
        <div className="food-bubble"></div>
        <div className="pan"></div>
        <div className="pan-handle"></div>
      </div>
      <h3 className="loader-title">Cooking your recipe</h3>
      <p className="loader-subtitle">{LOADING_MESSAGES[messageIndex]}</p>
    </div>
  );
}
