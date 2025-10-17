import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventData } from '../ data/eventData.js';
import Countdown from '../components/Countdown.jsx';
import MapButton from '../components/MapButton.jsx';
import Footer from '../components/Footer.jsx';
import logo from '../assets/images/logo.png';
import backgroundImage from '../assets/images/test.jpg';

const InvitePage = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden hero-background"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
       
        
        {/* Logo and Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto rounded-3xl p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <div className="w-40 h-40 mx-auto shadow-2xl mb-8 floating logo-circular-glow">
              <img 
                src={logo} 
                alt={`${eventData.salonName} Logo`}
                className="w-full h-full object-contain bg-white/90 p-3"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            {eventData.eventName}
          </motion.h1>
        </div>
      </motion.section>

      {/* Content Section */}
      <main className="bg-pattern">
        <div className="container mx-auto px-4 py-8">
          {/* Event Details */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Date & Time */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Fecha y Hora</h3>
                <p className="text-lg text-gray-700 mb-1">
                  {formatDate(eventData.eventDate)}
                </p>
                <p className="text-xl font-bold text-primary-600">
                  {formatTime(eventData.eventTime)} - {formatTime(eventData.eventEndTime)}
                </p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <MapButton
                address={eventData.address}
                googleMapsLink={eventData.googleMapsLink}
                venueName={eventData.venueName}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Countdown */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-12"
        >
          <Countdown
            targetDate={`${eventData.eventDate}T${eventData.eventTime}:00`}
            enabled={eventData.countdown.enabled}
          />
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/confirmar" className="btn-primary text-lg px-8 py-4 flex items-center gap-3">
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                Confirmar Asistencia
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4 flex items-center gap-3"
                onClick={() => window.print()}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                Descargar Invitación
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
        </div>
      </main>

      <Footer
        salonName={eventData.salonName}
        salonPhone={eventData.salonPhone}
        salonEmail={eventData.salonEmail}
        salonWebsite={eventData.salonWebsite}
      />
    </div>
  );
};

export default InvitePage;
