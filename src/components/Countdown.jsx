import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate, enabled = true }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!enabled) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate, enabled]);

  if (!enabled) return null;

  const timeUnits = [
    { label: 'Días', value: timeLeft.days, color: 'from-[#081cb7] to-[#ed0bf5]', glow: 'shadow-[#ed0bf5]/50' },
    { label: 'Horas', value: timeLeft.hours, color: 'from-[#ed0bf5] to-[#081cb7]', glow: 'shadow-[#081cb7]/50' },
    { label: 'Minutos', value: timeLeft.minutes, color: 'from-[#081cb7] to-[#ed0bf5]', glow: 'shadow-[#ed0bf5]/50' },
    { label: 'Segundos', value: timeLeft.seconds, color: 'from-[#ed0bf5] to-[#081cb7]', glow: 'shadow-[#081cb7]/50' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold baraki-text mb-4"
        >
          ¡Faltan para la fiesta!
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="text-center"
          >
            <div className={`bg-gradient-to-br ${unit.color} rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 glow-effect`} style={{boxShadow: `0 0 20px ${unit.glow.includes('purple') ? 'rgba(124, 58, 237, 0.3)' : unit.glow.includes('yellow') ? 'rgba(245, 158, 11, 0.3)' : 'rgba(6, 182, 212, 0.3)'}`}}>
              <motion.div
                key={unit.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-white mb-2"
              >
                {unit.value.toString().padStart(2, '0')}
              </motion.div>
              <div className="text-white text-sm md:text-base font-medium">
                {unit.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8"
        >
          <div className="bg-gradient-to-r from-[#081cb7] to-[#ed0bf5] text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-2">¡Es hoy!</h3>
            <p className="text-lg">¡La fiesta está a punto de comenzar!</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Countdown;
