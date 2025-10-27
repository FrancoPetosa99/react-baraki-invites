import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

/**
 * Página 404 - Invitación no encontrada
 */
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-cream-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icono de error */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        
        {/* Subtítulo */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Invitación no encontrada
        </h2>
        
        {/* Descripción */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Lo sentimos, la invitación que buscas no existe o ha expirado. 
          Verifica el enlace o contacta al anfitrión del evento.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button className="btn-primary flex items-center justify-center w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Ir al Inicio
            </button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center justify-center w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver atrás
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Si crees que esto es un error, puedes:
          </p>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li>• Verificar que el enlace esté completo</li>
            <li>• Contactar al anfitrión del evento</li>
            <li>• Regresar a la página anterior</li>
            <li>• Contactar a Baraki Event Hall</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
