import { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';

/**
 * Componente reutilizable de countdown o mensaje si el evento ya pasó.
 * @param {Object} props
 * @param {Object} props.eventData - Datos del evento (date, time, timeEnd)
 */

const EventCountdown = ({ eventData }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isPastEvent, setIsPastEvent] = useState(false);

  useEffect(() => {
    if (!eventData?.date || !eventData?.time) return;

    const eventDateTime = new Date(`${eventData.date}T${eventData.time}`);

    const updateCountdown = () => {
      const now = new Date();
      const diff = eventDateTime.getTime() - now.getTime();

      if (diff <= 0) {
        setIsPastEvent(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsPastEvent(false);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [eventData]);

  // 🔹 Si el evento ya pasó
  if (isPastEvent) {
    return (
      <div className="card-elegant text-center slide-up bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ¡El evento ya ha ocurrido!
        </h2>
        <p className="text-gray-600">
          Esperamos que hayas disfrutado del evento 🎉  
          Si te lo perdiste, ¡estate atento a los próximos!
        </p>
      </div>
    );
  }

  // 🔹 Mostrar countdown
  return (
    <div className="card-elegant slide-up">
      <h2 className="text-3xl font-bold text-gradient mb-6 flex items-center justify-center">
        <Clock className="w-8 h-8 mr-3" />
        ¡Falta poco!
      </h2>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Calendar className="w-5 h-5 text-primary-600" />
          <span className="font-medium text-lg">
            {new Date(`${eventData.date}T00:00:00`).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        <div className="flex items-center justify-center space-x-3 mb-6">
          <Clock className="w-5 h-5 text-primary-600" />
          <span className="font-medium text-lg">
            {eventData.time} - {eventData.timeEnd}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Días', value: timeLeft.days },
          { label: 'Horas', value: timeLeft.hours },
          { label: 'Minutos', value: timeLeft.minutes },
          { label: 'Segundos', value: timeLeft.seconds },
        ].map((t) => (
          <div key={t.label} className="text-center">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold">{t.value ?? 0}</div>
              <div className="text-sm opacity-90">{t.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCountdown;
