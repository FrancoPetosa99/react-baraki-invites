import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

/**
 * Tarjeta que muestra los detalles del lugar (dirección, teléfono, email).
 * @param {Object} props
 * @param {Object} props.venue - Objeto con {address, phone, email}
 */

const EventDetailsCard = ({ venue }) => {
  return (
    <div className="card-elegant slide-up">
      <img
        src="../public/logo.png"
        alt="Baraki Event Hall"
        className="h-32 w-auto mx-auto"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x128/ffffff/6366f1?text=Baraki'; }}
      />
      <div className="space-y-4 mt-6">
        <div className="flex items-center space-x-3 text-gray-800">
          <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <span>{venue.address}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-800">
          <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <span>{venue.phone}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-800">
          <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <span>{venue.email}</span>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;