import React from 'react';

// Componente que muestra la animación de carga de la página.

const PageLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-cream-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/src/assets/baraki/logo.png" 
              alt="Baraki Event Hall" 
              className="h-32 w-auto" 
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/128x128/ffffff/6366f1?text=Baraki'; }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;