import { AlertCircle, RefreshCw, XCircle } from 'lucide-react';

const ErrorBanner = ({ type = 'error', message, onRetry, onClose }) => {
  const colors = {
    error: {
      border: 'border-red-300',
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: <AlertCircle className="w-6 h-6 text-red-600 mr-2 flex-shrink-0" />,
    },
    warning: {
      border: 'border-red-700',
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: <XCircle className="w-6 h-6 text-red-600 mr-2 flex-shrink-0" />,
    },
    info: {
      border: 'border-blue-300',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      icon: <AlertCircle className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" />,
    },
  };

  const style = colors[type] || colors.error;

  return (
    <div
      className={`${style.bg} ${style.border} ${style.text} rounded-lg p-4 mb-4 flex flex-col items-start`}
      role="alert"
      aria-live="assertive"
    >

      <div className="flex items-center w-full mb-3">
        {style.icon}
        <span className="font-medium">{message}</span>
      </div>

      <div className="flex items-center gap-2 w-full justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-white/70 hover:bg-white text-sm font-medium border border-gray-200 transition w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition px-2 py-1"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBanner;