import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const baseURL = import.meta.env.VITE_API_URL;
if (!baseURL) {
  console.warn('⚠️  Variable de entorno VITE_API_URL no definida.');
}

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

if (import.meta.env.DEV) {
  const mock = new MockAdapter(apiClient, { delayResponse: 800 });

  mock.onGet(/\/api\/events\/(.+)\/invitations/).reply((config) => {
    
    
    const parts = config.url.split('/');
    const id = parts[parts.length - 2]; 

    switch (id) {
      case '404':
        return [404, { success: false, message: 'Invitación no encontrada' }];
      
      case '500':
        return [500, { success: false, message: 'Error interno del servidor' }];

      default:
        
        return [200, {
          success: true,
          message: 'Invitación cargada',
          data: {
            invitation: {
              title: `Fiesta de Cumpleaños (${id})`,
              image_url: '/src/assets/baraki/logo.png'
            },
            event_details: {
              host: { phone: '+54 11 4567-8901', email: 'info@baraki.com' },
              date: '2025-11-25T00:00:00.000Z', // Fechas en formato ISO del back
              start_time: '19:00',
              end_time: '22:00',
            }
          }
        }];
    }
  });

  mock.onPost(/\/api\/events\/(.+)\/guest/).reply(201, {
    success: true,
    message: 'Guest added successfully',
    data: { id: 'mock-event-id' }
  });
}

export default apiClient;