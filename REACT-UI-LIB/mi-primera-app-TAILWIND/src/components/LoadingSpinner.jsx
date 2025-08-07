// src/components/LoadingSpinner.jsx - Componente de carga reutilizable

import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Cargando...', 
  color = 'blue',
  variant = 'default' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500'
  };

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`${sizeClasses[size]} bg-${color}-500 rounded-full animate-bounce`}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.6s'
              }}
            />
          ))}
        </div>
        {message && (
          <p className="text-gray-600 text-sm font-medium">{message}</p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className={`${sizeClasses[size]} bg-${color}-500 rounded-full animate-pulse`} />
        {message && (
          <p className="text-gray-600 text-sm font-medium animate-pulse">{message}</p>
        )}
      </div>
    );
  }

  // Spinner por defecto
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin ${colorClasses[color]}`}
          style={{
            borderTopColor: 'transparent'
          }}
        />
        <div
          className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent rounded-full animate-ping ${colorClasses[color]}`}
          style={{
            borderTopColor: 'currentColor',
            animationDuration: '2s'
          }}
        />
      </div>
      {message && (
        <p className="text-gray-600 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
