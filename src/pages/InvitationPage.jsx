import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Sparkles,
  Gift,
  Loader2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import apiClient from '../utils/apiClient';
import { invitationsUrl, rsvpUrl } from '../config/endpoints';
import NotFound from './NotFound';
import EventCountdown from '../components/EventCountdown';
import ErrorBanner from '../components/ErrorBanner';

const InvitationPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });
  const [submitError, setSubmitError] = useState(null);

  const fetchEventData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
     
      const response = await apiClient.get(invitationsUrl(id));
      const { invitation, event_details } = response.data.data;
      
      const mappedEventData = {
        title: invitation.title,
        date: event_details.date.split('T')[0], 
        time: event_details.start_time, 
        timeEnd: event_details.end_time, 
       
        venue: {
         
          address: 'Av. Corrientes 1234, Buenos Aires', 
          phone: event_details.host.phone,
          email: event_details.host.email,
        },
        
        design: {
          url: invitation.image_url,
          name: invitation.title
        },
      };

      setEventData(mappedEventData);
      
    } catch (err) {
      
      if (err.response && err.response.status === 404) {
        setEventData(null);
      } else {
        console.error('Error cargando invitación:', err);
        setError('No se pudo cargar la invitación. Por favor, intenta de nuevo.');
        setEventData(null);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    const { nombre, apellido, email } = formData;

    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = 'Este campo es obligatorio'
    if (!apellido.trim()) newErrors.apellido = 'Este campo es obligatorio'
    if (!email.trim()) newErrors.email = 'Este campo es obligatorio'
    
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setFieldErrors({});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) {
      setSubmitError('Por favor, ingresa un formato de email válido.'); 
      return;
    }

    setIsSubmitting(true);
    try {
    
      const payload = {
        first_name: nombre.trim(), 
        last_name: apellido.trim(), 
        email: email.trim(),
        assist: true 
      };
      await apiClient.post(rsvpUrl(id), payload); 
    
      
      setFormSubmitted(true); 
      setFormData({ nombre: '', apellido: '', email: '' }); 
    } catch (err) {
      console.error('Error enviando RSVP:', err); 
      
      if (err.response && err.response.status) {
        if (err.response.status === 409) {
          setSubmitError('Ya existe una confirmación de asistencia con este email. ¡Gracias por confirmar!');
        } else if (err.response.status === 400 && err.response.data.message) {
          setSubmitError(err.response.data.message);
        } else {
          setSubmitError('No se pudo enviar la confirmación. Error en el servidor o red. Por favor, intenta de nuevo.');
        }
      } else {
        setSubmitError('No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.');
      }
      
    } finally {
      setIsSubmitting(false); 
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/src/assets/baraki/logo.png" alt="Baraki Event Hall" className="h-32 w-auto" />
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
          <ErrorBanner
            type="error"
            message={typeof error === 'string' ? error : error.message}
            onRetry={fetchEventData}
          />
        </div>
      </div>
    );
  }

  if (!eventData) return <NotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-cream-50">
      {/* ... (Sección Hero sin cambios) ... */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={eventData.design.url}
            alt={eventData.design.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1920x1080/f0f4f7/6366f1?text=Evento'; }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
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
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="fade-in">
            <h1 className="invitation-header text-shadow-lg mb-6">{eventData.title}</h1>
            <button onClick={scrollToForm} className="btn-elegant transform hover:scale-105 transition-all duration-300">
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

      {/* Sección principal */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <EventCountdown eventData={eventData} />
            </div>
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

          {/* Formulario RSVP */}
          <div ref={formRef} className="mt-16 card-elegant slide-up">
            <div className="relative overflow-hidden">
              {/* Formulario */}
              {!formSubmitted ? (
               
                <form onSubmit={handleFormSubmit} noValidate className="max-w-2xl mx-auto transition-all duration-500 ease-in-out">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gradient mb-4">¡Confirma tu asistencia!</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre <span className="text-sm text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          fieldErrors.nombre
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-primary-500' 
                        }`}
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                      />
                      {fieldErrors.nombre && (
                        <p className="text-sm text-red-500 mt-1">{fieldErrors.nombre}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido <span className="text-sm text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          fieldErrors.apellido
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-primary-500' 
                        }`}
                        placeholder="Tu apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                      />
                      {fieldErrors.apellido && (
                        <p className="text-sm text-red-500 mt-1">{fieldErrors.apellido}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-sm text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          fieldErrors.email
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-primary-500' 
                        }`}
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      
                      {fieldErrors.email && (
                        <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
                      )}
                    </div>
                    </div>

                  {submitError && (
                    <ErrorBanner
                      type="warning"
                      message={submitError}
                      onClose={() => setSubmitError(null)}
                    />
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

                  <p className="text-sm text-red-500 mt-4 text-center">* Campos obligatorios</p>
                </form>
              ) : (
               
                <div className="text-center py-12">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gradient mb-4">¡Confirmación exitosa!</h3>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                    <p className="text-green-800 font-medium mb-2">📧 Te enviaremos un email de confirmación</p>
                    <p className="text-green-700 text-sm">Mantente atento a tu correo para recibir más detalles del evento</p>
                  </div>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmitError(null);
                    }}
                    className="btn-elegant transform hover:scale-105 transition-all duration-300 w-full"
                  >
                    Nueva asistencia
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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