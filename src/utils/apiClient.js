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

  mock.onGet(/\/invitations\/(.+)/).reply((config) => {
  
    const id = config.url.split('/').pop();

    switch (id) {
      case '404':
        // Simular un 404 Not Found
        return [404, { message: 'Invitación no encontrada' }];
      
      case '500':
        // Simular un 500 Internal Server Error
        return [500, { message: 'Error interno del servidor' }];

      default:
        // Simular un 200 OK para cualquier otro ID
        return [200, {
          id,
          title: `Fiesta de Cumpleaños (${id})`,
          date: '2025-10-25',
          time: '19:00',
          timeEnd: '22:00',
          venue: { 
            address: 'Av. Corrientes 1234, Buenos Aires',
            phone: '+54 11 4567-8901',
            email: 'info@baraki.com'
          },
          design: { url: '/src/assets/baraki/logo.png', name: 'Baraki' },
          rsvp: { deadline: '2024-12-10' },
        }];
    }
  });

  mock.onPost(/\/invitations\/\d+\/rsvp/).reply(200, {
    message: 'RSVP recibido correctamente ✅',
  });
}

export default apiClient;

