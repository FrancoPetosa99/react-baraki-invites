export const eventData = {
  eventName: "¡Cumpleaños de Emma!",
  celebrantName: "Emma García",
  eventDate: "2025-03-15",
  eventTime: "16:00",
  eventEndTime: "20:00",
  
  venueName: "Salón de Fiestas Baraki",
  address: "Av. Principal 123, Ciudad, Provincia",
  googleMapsLink: "https://maps.google.com/?q=Av.+Principal+123,+Ciudad,+Provincia",
  
  salonName: "Baraki Eventos",
  salonPhone: "+54 11 1234-5678",
  salonEmail: "info@baraki.com.ar",
  salonWebsite: "www.baraki.com.ar",

  theme: {
    primaryColor: "#081cb7ff",
    secondaryColor: "#ed0bf5ff",
    accentColor: "#06b6d4",
    backgroundColor: "#f3f0ff"
  },
  
  // Mensaje personalizado
  welcomeMessage: "¡Te invitamos a celebrar el cumpleaños de Emma!",
  description: "Un día lleno de diversión, juegos, música y muchas sorpresas te esperan. ¡No te lo pierdas!",
  
  // Configuración del contador
  countdown: {
    enabled: true,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true
  },
  
  // Configuración de confirmación
  confirmation: {
    requireDNI: false,
    maxAccompaniments: 5,
    allowDecline: true
  }
};

// Configuración global de la aplicación
export const appConfig = {
  appName: "Invitaciones Virtuales Baraki",
  version: "1.0.0",
  developer: "Baraki Development Team",
  
  // Configuración de rutas
  routes: {
    home: "/",
    confirm: "/confirmar"
  },
  
  // Configuración de animaciones
  animations: {
    enabled: true,
    duration: 0.5,
    easing: "ease-out"
  }
};
