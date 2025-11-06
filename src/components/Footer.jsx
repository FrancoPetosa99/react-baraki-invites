import React from 'react';

// Componente para el pie de página.

const Footer = () => {
  return (
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
  );
};

export default Footer;