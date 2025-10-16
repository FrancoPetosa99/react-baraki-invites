import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.png';

const Navbar = ({ salonName }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 logo-circular-glow">
              <img 
                src={logo} 
                alt={`${salonName} Logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold baraki-text">
                {salonName}
              </h1>
              <p className="text-sm text-gray-600">
                Invitaciones Virtuales
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <Link
              to="/"
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-300"
            >
              Inicio
            </Link>
            <Link
              to="/confirmar"
              className="btn-primary text-sm"
            >
              Confirmar Asistencia
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
