import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { invitationsUrl } from '../config/endpoints';

// Componentes de página
import NotFound from './NotFound';

// Componentes modulares
import PageLoader from '../components/PageLoader';
import EventHero from '../components/EventHero';
import EventCountdown from '../components/EventCountdown';
import EventDetailsCard from '../components/EventDetailsCard';
import EventConfirmation from '../components/EventConfirmation';
import Footer from '../components/Footer';
import ErrorBanner from '../components/ErrorBanner';

const InvitationPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref para el scroll al formulario de confirmación
  const formRef = useRef(null);

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

  // Función para hacer scroll al formulario de confirmación
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return <PageLoader />;
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


  if (!eventData) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-cream-50">

      <EventHero
        title={eventData.title}
        design={eventData.design}
        onConfirmClick={scrollToForm}
      />

      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Columna Izquierda: Countdown */}
            <div className="space-y-8">
              <EventCountdown eventData={eventData} />
            </div>

            {/* Columna Derecha: Detalles del Lugar */}
            <EventDetailsCard venue={eventData.venue} />
          </div>

          <EventConfirmation eventId={id} formRefProp={formRef} />

        </div>
        <div className="mt-16"></div>
      </div>
      <Footer />
    </div>
  );
};

export default InvitationPage;