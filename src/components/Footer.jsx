import React from 'react';
import { Code2, Mail, Globe } from 'lucide-react';

// Componente para el pie de página.
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-10 mb-10">

          {/* --- Columna BARAKI --- */}
          {/* --- Columna BARAKI --- */}
          <div className="flex flex-col items-center md:items-start">
            
            {/* Contenedor blanco y redondeado para el logo */}
            <div className="bg-white rounded-full p-2 mb-4 shadow-md">
              <img
                src="/logo.png"
                alt="Baraki Event Hall"
                className="h-16 w-auto" 
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/ffffff/6366f1?text=Logo'; }}
              />
            </div>
            
            <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
              El lugar perfecto para tus momentos inolvidables.
            </p>
          </div>

          {/* --- Columna FILOSOFTWARE --- */}
          <div className="flex flex-col items-center md:items-start">
            <h5 className="text-lg font-semibold text-white mb-4">Desarrollado por</h5>
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-6 h-6 text-primary-400" />
              <h6 className="text-xl font-bold text-primary-400">Filosoftware</h6>
            </div>
            <p className="text-gray-400 text-sm mb-4">Soluciones tecnológicas innovadoras</p>
            
            {/* Enlaces con iconos */}
            <div className="space-y-2 text-sm">
              <a 
                href="mailto:info@filosoftware.com" 
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@filosoftware.com</span>
              </a>
              <a 
                href="https://www.filosoftware.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>www.filosoftware.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-10">
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
