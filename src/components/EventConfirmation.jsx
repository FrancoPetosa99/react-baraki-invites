import React, { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import apiClient from '../utils/apiClient';
import { rsvpUrl } from '../config/endpoints';
import ErrorBanner from './ErrorBanner';

/**
 * Componente autocontenido para el formulario de confirmación de asistencia (RSVP).
 * Maneja su propio estado, validación y envío.
 * @param {Object} props
 * @param {string} props.eventId - El ID del evento para enviar el POST
 * @param {React.Ref} props.formRefProp - Ref pasado desde el padre para el scroll
 */

const EventConfirmation = ({ eventId, formRefProp }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });
  const [submitError, setSubmitError] = useState(null);
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
      await apiClient.post(rsvpUrl(eventId), payload); 
      
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

  return (
    <div ref={formRefProp} className="mt-16 card-elegant slide-up">
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
  );
};

export default EventConfirmation;