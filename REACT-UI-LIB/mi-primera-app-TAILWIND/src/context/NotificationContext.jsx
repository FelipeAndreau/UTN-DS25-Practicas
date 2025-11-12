// src/context/NotificationContext.jsx - Sistema de notificaciones avanzado

import React, { createContext, useContext, useReducer, useCallback } from 'react';

const NotificationContext = createContext();

// Tipos de notificación
const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  LOADING: 'loading'
};

// Estado inicial
const initialState = {
  notifications: [],
  maxNotifications: 5,
  defaultDuration: 5000,
  position: 'top-right'
};

// Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const newNotification = {
        id: Date.now() + Math.random(),
        timestamp: new Date(),
        ...action.payload
      };
      
      return {
        ...state,
        notifications: [
          newNotification,
          ...state.notifications.slice(0, state.maxNotifications - 1)
        ]
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: []
      };
    
    case 'UPDATE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload.id
            ? { ...n, ...action.payload.updates }
            : n
        )
      };
    
    case 'SET_SETTINGS':
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
};

// Provider
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Función para agregar notificación
  const addNotification = useCallback((notification) => {
    const { type, title, message, duration, persistent, action } = notification;
    
    const id = Date.now() + Math.random();
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id,
        type: type || NOTIFICATION_TYPES.INFO,
        title: title || '',
        message: message || '',
        duration: duration ?? state.defaultDuration,
        persistent: persistent || false,
        action: action || null
      }
    });

    // Auto-remover si no es persistente
    if (!persistent && duration !== 0) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, duration || state.defaultDuration);
    }

    return id;
  }, [state.defaultDuration]);

  // Funciones de conveniencia
  const success = useCallback((message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.SUCCESS,
      title: options.title || '¡Éxito!',
      message,
      ...options
    });
  }, [addNotification]);

  const error = useCallback((message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.ERROR,
      title: options.title || 'Error',
      message,
      persistent: options.persistent ?? true,
      ...options
    });
  }, [addNotification]);

  const warning = useCallback((message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.WARNING,
      title: options.title || 'Advertencia',
      message,
      ...options
    });
  }, [addNotification]);

  const info = useCallback((message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.INFO,
      title: options.title || 'Información',
      message,
      ...options
    });
  }, [addNotification]);

  const loading = useCallback((message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.LOADING,
      title: options.title || 'Cargando...',
      message,
      persistent: true,
      duration: 0,
      ...options
    });
  }, [addNotification]);

  // Remover notificación
  const removeNotification = useCallback((id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, []);

  // Limpiar todas las notificaciones
  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  // Actualizar notificación existente
  const updateNotification = useCallback((id, updates) => {
    dispatch({ 
      type: 'UPDATE_NOTIFICATION', 
      payload: { id, updates } 
    });
  }, []);

  // Promesa con notificación
  const withNotification = useCallback(async (promise, messages = {}) => {
    const {
      loading: loadingMsg = 'Procesando...',
      success: successMsg = 'Operación completada',
      error: errorMsg = 'Ha ocurrido un error'
    } = messages;

    const loadingId = loading(loadingMsg);

    try {
      const result = await promise;
      removeNotification(loadingId);
      success(successMsg);
      return result;
    } catch (err) {
      removeNotification(loadingId);
      error(typeof errorMsg === 'function' ? errorMsg(err) : errorMsg);
      throw err;
    }
  }, [loading, success, error, removeNotification]);

  // Configurar ajustes
  const setSettings = useCallback((settings) => {
    dispatch({ type: 'SET_SETTINGS', payload: settings });
  }, []);

  const value = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAll,
    updateNotification,
    success,
    error,
    warning,
    info,
    loading,
    withNotification,
    setSettings,
    NOTIFICATION_TYPES
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook personalizado
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications debe ser usado dentro de NotificationProvider');
  }
  return context;
};
