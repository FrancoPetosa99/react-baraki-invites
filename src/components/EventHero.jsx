import React from 'react';
import { Star, Sparkles, Gift } from 'lucide-react';

/**
 * Muestra la sección principal (Hero) de la invitación.
 * @param {Object} props
 * @param {string} props.title - Título del evento
 * @param {Object} props.design - Objeto con {url, name} para la imagen
 * @param {Function} props.onConfirmClick - Función a llamar al hacer clic en "Confirmar Asistencia"
 */

const EventHero = ({ title, design, onConfirmClick }) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={design.url}
          alt={design.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1920x1080/f0f4f7/6366f1?text=Evento'; }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <img
            src="/logo.png"
            alt="Baraki Event Hall"
            className="h-16 w-auto"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/ffffff/6366f1?text=Logo'; }}
          />
        </div>
      </div>
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="fade-in">
          <h1 className="invitation-header text-shadow-lg mb-6">{title}</h1>
          <button onClick={onConfirmClick} className="btn-elegant transform hover:scale-105 transition-all duration-300">
            Confirmar Asistencia
          </button>
        </div>
      </div>
      <div className="absolute top-20 left-10 floating-element">
        <Star className="w-8 h-8 text-yellow-300 opacity-70" />
      </div>
      <div className="absolute bottom-20 right-10 floating-element" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-6 h-6 text-pink-300 opacity-70" />
      </div>
      <div className="absolute top-1/2 left-5 floating-element" style={{ animationDelay: '2s' }}>
        <Gift className="w-7 h-7 text-purple-300 opacity-70" />
      </div>
    </div>
  );
};

export default EventHero;