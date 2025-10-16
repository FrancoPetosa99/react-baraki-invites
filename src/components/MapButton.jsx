import React from 'react';
import { motion } from 'framer-motion';

const MapButton = ({ address, googleMapsLink, venueName }) => {
  const handleMapClick = () => {
    if (googleMapsLink) {
      window.open(googleMapsLink, '_blank');
    } else {
      // Fallback: abrir Google Maps con la dirección
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="card hover:shadow-2xl transition-all duration-300">
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-4"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-lg">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </div>
          </motion.div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {venueName}
          </h3>
          
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {address}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMapClick}
            className="btn-accent w-full flex items-center justify-center gap-2"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
            Abrir en Google Maps
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MapButton;
