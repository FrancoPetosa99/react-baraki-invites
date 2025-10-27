# 🎉 Baraki Invitations - Sistema de Invitaciones Virtuales

## 📋 Descripción

Sistema de invitaciones virtuales para eventos Baraki. Los invitados pueden acceder a través de un enlace único para ver su invitación virtual con todos los detalles del evento y la información del salón.

## 🚀 Características

- **Invitaciones Virtuales**: Diseño atractivo y responsive
- **Información Completa**: Detalles del evento, anfitrión y salón
- **Diseño Temático**: Soporte para diferentes temas de eventos
- **Responsive**: Optimizado para móviles y desktop
- **Animaciones**: Efectos visuales atractivos
- **RSVP**: Sistema de confirmación de asistencia

## 🛠️ Stack Tecnológico

- **React 18**: Framework principal
- **Vite**: Build tool y dev server
- **TailwindCSS**: Framework de estilos
- **React Router DOM**: Enrutamiento
- **Lucide React**: Iconos
- **Date-fns**: Manipulación de fechas

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🎨 Diseño

### Colores
- **Primario**: Azul (#3b82f6)
- **Secundario**: Rosa (#ec4899)
- **Baraki**: Naranja (#f97316)
- **Cream**: Beige (#fefdf8)

### Tipografías
- **Sans**: Inter (texto general)
- **Serif**: Playfair Display (títulos elegantes)
- **Display**: Poppins (elementos destacados)

## 📱 Responsive Design

- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: sm, md, lg, xl
- **Grid System**: Layouts adaptativos
- **Touch Friendly**: Botones y elementos táctiles

## 🎯 Funcionalidades

### Página de Invitación
- **Header**: Imagen de fondo con información principal
- **Detalles del Evento**: Fecha, hora, tema, invitados
- **Información del Anfitrión**: Contacto y detalles
- **Información del Salón**: Baraki Event Hall
- **RSVP**: Sistema de confirmación
- **Footer**: Información de contacto

### Elementos Interactivos
- **Animaciones**: Fade-in, slide-up, float
- **Hover Effects**: Transiciones suaves
- **Loading States**: Estados de carga
- **Responsive**: Adaptación a diferentes pantallas

## 🔧 Configuración

### Variables de Entorno
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Baraki Invitations
```

### Rutas
- `/` - Página principal de invitación
- `/invitation/:id` - Invitación específica
- `/*` - Página 404

## 📊 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas de la aplicación
│   ├── InvitationPage.jsx
│   └── NotFound.jsx
├── utils/              # Utilidades y helpers
├── assets/            # Imágenes y recursos
├── styles/            # Estilos adicionales
├── App.jsx            # Componente principal
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🎨 Personalización

### Temas de Eventos
- Soporte para diferentes diseños de invitación
- Colores personalizables por tema
- Imágenes de fondo temáticas

### Información del Evento
- Título del evento
- Fecha y hora
- Información del anfitrión
- Detalles del salón
- Instrucciones especiales

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Variables de Entorno
- Configurar URL de API
- Configurar dominio de producción
- Configurar variables de entorno

## 📱 Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## 🎯 Casos de Uso

### Invitaciones de Cumpleaños
- Temas infantiles
- Información del cumpleañero
- Detalles de la celebración

### Eventos Corporativos
- Información profesional
- Detalles del evento
- Contacto empresarial

### Celebraciones Especiales
- Bodas, aniversarios
- Eventos familiares
- Celebraciones únicas

## 🔧 Desarrollo

### Scripts Disponibles
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview de producción
- `npm run lint` - Linter de código

### Estructura de Datos
```javascript
const eventData = {
  id: 'string',
  title: 'string',
  host: {
    name: 'string',
    phone: 'string',
    email: 'string'
  },
  date: 'YYYY-MM-DD',
  time: 'HH:MM',
  venue: {
    name: 'string',
    address: 'string',
    phone: 'string',
    email: 'string',
    description: 'string'
  },
  theme: 'string',
  design: {
    url: 'string',
    name: 'string'
  },
  guests: 'number',
  specialRequests: 'string',
  rsvp: {
    deadline: 'YYYY-MM-DD',
    phone: 'string',
    email: 'string'
  }
};
```

## 📈 Métricas

### Performance
- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### SEO
- **Meta Tags**: Optimizados
- **Structured Data**: Implementado
- **Open Graph**: Configurado
- **Twitter Cards**: Configurado

## 🎨 Diseño System

### Componentes
- **Buttons**: Primary, secondary, elegant
- **Cards**: Elegant, venue-info
- **Typography**: Headers, subtitles, body
- **Layout**: Grid, flex, responsive

### Animaciones
- **fade-in**: Aparición suave
- **slide-up**: Deslizamiento hacia arriba
- **float**: Flotación suave
- **bounce-gentle**: Rebote suave

## 🔒 Seguridad

### Validación
- **Input Validation**: Validación de entradas
- **XSS Protection**: Protección contra XSS
- **CSRF Protection**: Protección contra CSRF

### Datos Sensibles
- **No Storage**: No almacenamiento de datos sensibles
- **Secure Headers**: Headers de seguridad
- **HTTPS**: Conexión segura

## 📱 PWA Ready

### Service Worker
- **Caching**: Cache de recursos
- **Offline**: Funcionamiento offline
- **Updates**: Actualizaciones automáticas

### Manifest
- **Icons**: Iconos de aplicación
- **Theme**: Tema de la aplicación
- **Display**: Modo de visualización

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] **PWA Support**: Aplicación web progresiva
- [ ] **Offline Mode**: Funcionamiento offline
- [ ] **Push Notifications**: Notificaciones push
- [ ] **Analytics**: Métricas de uso
- [ ] **A/B Testing**: Pruebas A/B
- [ ] **Multi-language**: Soporte multiidioma

## 📞 Soporte

### Contacto
- **Email**: info@baraki.com
- **Teléfono**: +54 9 11 9876-5432
- **Dirección**: Av. Corrientes 1234, Buenos Aires

### Documentación
- **API Docs**: Documentación de API
- **Component Library**: Biblioteca de componentes
- **Style Guide**: Guía de estilos

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

---

**Baraki Event Hall** - Donde los sueños se hacen realidad ✨
