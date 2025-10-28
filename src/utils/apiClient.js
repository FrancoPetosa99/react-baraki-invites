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

  mock.onGet(/\/invitations\/\d+/).reply((config) => {
    const id = config.url.split('/').pop();
    return [200, {
      id,
      title: 'Fiesta de Cumpleaños de María',
      date: '2025-10-26',
      time: '19:00',
      timeEnd: '22:00',
      venue: { address: 'Av. Corrientes 1234, Buenos Aires' },
      design: { url: '/src/assets/baraki/logo.png', name: 'Baraki' },
      rsvp: { deadline: '2024-12-10' },
    }];
  });

  mock.onPost(/\/invitations\/\d+\/rsvp/).reply(200, {
    message: 'RSVP recibido correctamente ✅',
  });
}
