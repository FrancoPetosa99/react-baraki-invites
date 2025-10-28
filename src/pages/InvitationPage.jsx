import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Sparkles,
  Gift,
  Loader2,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import apiClient from '../utils/apiClient';
import { invitationsUrl, rsvpUrl } from '../config/endpoints';
import NotFound from './NotFound';


const InvitationPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);


  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: ''
  });
  const [submitError, setSubmitError] = useState(null);


  const fetchEventData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(invitationsUrl(id));
      // Éxito 200 OK
      setEventData(response.data);
    } catch (err) {
      // Manejo de errores
      if (err.response && err.response.status === 404) {
        // Manejo 404 Not Found
        setEventData(null);
      } else {
        // Manejo de otros errores (red, 500, etc.)
        console.error('Error cargando invitación:', err);
        setError('No se pudo cargar la invitación. Por favor, intenta de nuevo.');
        setEventData(null);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch event data al montar
  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  // Countdown timer
  useEffect(() => {
    if (!eventData) return;

    const calculateTimeLeft = () => {
      // Asegurarse que la fecha tenga el timezone correcto (asumimos local)
      const eventDateTime = new Date(eventData.date + 'T' + eventData.time);
      const now = new Date();
      const difference = eventDateTime.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventData]);

  // Función para hacer scroll al formulario
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Maneja los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- FUNCIÓN ACTUALIZADA CON VALIDACIÓN ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null); // Limpiar error anterior

    // --- Validación de campos vacíos y espacios en blanco ---
    const { nombre, apellido, email } = formData;
    
    if (nombre.trim() === '' || apellido.trim() === '' || email.trim() === '') {
      setSubmitError('Todos los campos son obligatorios.');
      return; // Detener el envío
    }

    // --- Validación básica de formato de email ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitError('Por favor, ingresa un formato de email válido.');
      return; // Detener el envío
    }
    // --- Fin de la validación ---

    setIsSubmitting(true);

    try {
      // Enviamos los datos normalizados (sin espacios extra)
      const payload = {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: email.trim()
      };

      // Llamada REAL a la API (que será mockeada por MockAdapter)
      await apiClient.post(rsvpUrl(id), payload);

      setFormSubmitted(true);
      setFormData({ nombre: '', apellido: '', email: '' });

    } catch (err) {
      console.error('Error enviando RSVP:', err);
      setSubmitError('No se pudo enviar la confirmación. Por favor, intenta de nuevo.');

    } finally {
      setIsSubmitting(false);
    }
  };
  // --- FIN DE LA FUNCIÓN ACTUALIZADA ---


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-6">
            {/* Spinner de fondo */}
            <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>

            {/* Logo de Baraki en el centro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/src/assets/baraki/logo.png"
                alt="Baraki Event Hall"
                className="h-32 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-cream-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center card-elegant">
          <div className="mb-4">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ocurrió un Error
          </h2>
          <p className="text-gray-600 mb-8">
            {error}
          </p>
          <button
            onClick={fetchEventData} // Botón de reintento
            className="btn-primary flex items-center justify-center w-full sm:w-auto mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-cream-50">
      {/* Header con imagen de fondo */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <img
            src={eventData.design.url}
            alt={eventData.design.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1920x1080/f0f4f7/6366f1?text=Evento'; }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Logo Baraki */}
        <div className="absolute top-6 right-6 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <img
              src="/src/assets/baraki/logo.png"
              alt="Baraki Event Hall"
              className="h-16 w-auto"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/ffffff/6366f1?text=Logo'; }}
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="fade-in">
            <h1 className="invitation-header text-shadow-lg mb-6">
              {eventData.title}
            </h1>

            {/* Botón de acción */}
            <button
              onClick={scrollToForm}
              className="btn-elegant transform hover:scale-105 transition-all duration-300"
            >
              Confirmar Asistencia
            </button>
          </div>
        </div>

        {/* Elementos decorativos flotantes */}
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

      {/* Sección de detalles del evento */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Countdown Timer */}
            <div className="space-y-8">
              <div className="card-elegant slide-up">
                <h2 className="text-3xl font-bold text-gradient mb-6 flex items-center justify-center">
                  <Clock className="w-8 h-8 mr-3" />
                  ¡Falta poco!
                </h2>

                {/* Información básica del evento */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <span className="font-medium text-lg">{new Date(eventData.date + 'T00:00:00').toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long', // Cambiado a 'long' para más claridad
                      day: 'numeric'
                    })}</span>
                  </div>

                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span className="font-medium text-lg">{eventData.time} - {eventData.timeEnd}</span>
                  </div>
                </div>

                {/* Countdown Display */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl p-4 shadow-lg">
                      <div className="text-3xl font-bold">{timeLeft.days}</div>
                      <div className="text-sm opacity-90">Días</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-xl p-4 shadow-lg">
                      <div className="text-3xl font-bold">{timeLeft.hours}</div>
                      <div className="text-sm opacity-90">Horas</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 shadow-lg">
                      <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                      <div className="text-sm opacity-90">Minutos</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-cream-500 to-cream-600 text-white rounded-xl p-4 shadow-lg">
                      <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                      <div className="text-sm opacity-90">Segundos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Información del salón */}
            <div className="card-elegant slide-up">
              <img
                src="/src/assets/baraki/logo.png"
                alt="Baraki Event Hall"
                className="h-32 w-auto mx-auto"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x128/ffffff/6366f1?text=Baraki'; }}
              />

              <div className="space-y-4 mt-6">
                <div className="flex items-center space-x-3 text-gray-800">
                  <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span>{eventData.venue.address}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-800">
                  <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span>{eventData.venue.phone}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-800">
                  <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span>{eventData.venue.email}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sección de Confirmación de Asistencia */}
          <div ref={formRef} className="mt-16 card-elegant slide-up">
            <div className="relative overflow-hidden">
              {/* Formulario */}
              <div className={`transition-all duration-500 ease-in-out ${formSubmitted ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gradient mb-4">
                    ¡Confirma tu asistencia!
                  </h3>
                </div>

                <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre <span className="text-sm text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido <span className="text-sm text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Tu apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-sm text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Bloque de error (AQUÍ SE MOSTRARÁ LA VALIDACIÓN) */}
                  {submitError && (
                    <div className="text-center mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                      <p>{submitError}</p>
                    </div>
                  )}


                  <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-elegant transform hover:scale-105 transition-all duration-300 w-full disabled:opacity-70 disabled:transform-none"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 inline animate-spin" /> : 'Enviar'}
                    </button>
                  </div>

                  <p className="text-sm text-red-500 mt-4 text-center">
                    * Campos obligatorios
                  </p>
                </form>
              </div>

              {/* Mensaje de éxito */}
              <div className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${formSubmitted ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                <div className="text-center py-12">
                  <div className="mb-6">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  </div>

                  <h3 className="text-3xl font-bold text-gradient mb-4">
                    ¡Confirmación exitosa!
                  </h3>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                    <p className="text-green-800 font-medium mb-2">
                      📧 Te enviaremos un email de confirmación
                    </p>
                    <p className="text-green-700 text-sm">
                      Mantente atento a tu correo para recibir más detalles del evento
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setSubmitError(null); // Limpiar error al volver
                      }}
                      className="btn-elegant transform hover:scale-105 transition-all duration-300 w-full"
                    >
                      Nueva asistencia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Filosoftware */}
            <div className="text-center md:text-left">
              <h5 className="text-lg font-semibold text-white mb-4">Desarrollado por</h5>
              <div className="mb-4">
                <h6 className="text-xl font-bold text-primary-400 mb-2">Filosoftware</h6>
                <p className="text-gray-400 text-sm mb-3">Soluciones tecnológicas innovadoras</p>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">info@filosoftware.com</p>
                <p className="text-gray-400">www.filosoftware.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-2 md:mb-0">
                © 2025 Baraki. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-sm">
                Powered by <span className="text-primary-400 font-semibold">Filosoftware</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InvitationPage;