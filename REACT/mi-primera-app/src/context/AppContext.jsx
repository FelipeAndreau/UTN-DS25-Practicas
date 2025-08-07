// src/context/AppContext.jsx - Context API para manejo de estado global
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estado inicial
const initialState = {
  theme: 'light',
  user: null,
  navigation: {
    currentPage: 'home',
    history: []
  },
  libreria: {
    nombre: 'LIBRERÍA YENNY',
    slogan: 'Tu biblioteca de confianza',
    info: {
      telefono: '+54-9-221-538-2762',
      email: 'info@libreriayenny.com',
      direccion: 'Buenos Aires, La Plata'
    }
  }
};

// Tipos de acciones
const ACTIONS = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_USER: 'SET_USER',
  NAVIGATE_TO: 'NAVIGATE_TO',
  UPDATE_LIBRERIA_INFO: 'UPDATE_LIBRERIA_INFO'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    
    case ACTIONS.NAVIGATE_TO:
      return {
        ...state,
        navigation: {
          currentPage: action.payload,
          history: [...state.navigation.history, state.navigation.currentPage]
        }
      };
    
    case ACTIONS.UPDATE_LIBRERIA_INFO:
      return {
        ...state,
        libreria: {
          ...state.libreria,
          ...action.payload
        }
      };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    toggleTheme: () => dispatch({ type: ACTIONS.TOGGLE_THEME }),
    setUser: (user) => dispatch({ type: ACTIONS.SET_USER, payload: user }),
    navigateTo: (page) => dispatch({ type: ACTIONS.NAVIGATE_TO, payload: page }),
    updateLibreriaInfo: (info) => dispatch({ type: ACTIONS.UPDATE_LIBRERIA_INFO, payload: info })
  };

  // Efecto para persistir tema en localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== state.theme) {
      actions.toggleTheme();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.body.className = `theme-${state.theme}`;
  }, [state.theme]);

  const value = {
    state,
    actions
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};
