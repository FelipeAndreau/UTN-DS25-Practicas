// src/context/ThemeContext.jsx - Context para temas dinámicos

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ThemeContext = createContext();

// Temas predefinidos
const themes = {
  light: {
    name: 'light',
    colors: {
      primary: 'bg-blue-600',
      secondary: 'bg-gray-600',
      background: 'bg-white',
      text: 'text-gray-900',
      border: 'border-gray-200'
    },
    styles: {
      card: 'bg-white shadow-md border border-gray-200',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      input: 'bg-white border-gray-300 text-gray-900'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-700',
      background: 'bg-gray-900',
      text: 'text-gray-100',
      border: 'border-gray-700'
    },
    styles: {
      card: 'bg-gray-800 shadow-xl border border-gray-700',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
      input: 'bg-gray-800 border-gray-600 text-gray-100'
    }
  },
  sepia: {
    name: 'sepia',
    colors: {
      primary: 'bg-amber-600',
      secondary: 'bg-yellow-600',
      background: 'bg-amber-50',
      text: 'text-amber-900',
      border: 'border-amber-200'
    },
    styles: {
      card: 'bg-amber-25 shadow-md border border-amber-200',
      button: 'bg-amber-600 hover:bg-amber-700 text-white',
      input: 'bg-amber-25 border-amber-300 text-amber-900'
    }
  },
  ocean: {
    name: 'ocean',
    colors: {
      primary: 'bg-teal-600',
      secondary: 'bg-cyan-600',
      background: 'bg-slate-50',
      text: 'text-slate-900',
      border: 'border-slate-200'
    },
    styles: {
      card: 'bg-white shadow-lg border border-slate-200',
      button: 'bg-teal-600 hover:bg-teal-700 text-white',
      input: 'bg-white border-slate-300 text-slate-900'
    }
  }
};

// Estado inicial
const initialState = {
  currentTheme: 'light',
  theme: themes.light,
  availableThemes: Object.keys(themes),
  preferences: {
    fontSize: 'medium',
    animations: true,
    reducedMotion: false
  }
};

// Reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      const newTheme = themes[action.payload] || themes.light;
      return {
        ...state,
        currentTheme: action.payload,
        theme: newTheme
      };
    
    case 'TOGGLE_THEME':
      const nextTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      return {
        ...state,
        currentTheme: nextTheme,
        theme: themes[nextTheme]
      };
    
    case 'SET_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };
    
    case 'RESET_THEME':
      return {
        ...initialState,
        preferences: state.preferences
      };
    
    default:
      return state;
  }
};

// Provider
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Cargar tema guardado al inicializar
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedPreferences = localStorage.getItem('themePreferences');
    
    if (savedTheme && themes[savedTheme]) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }
    
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: 'SET_PREFERENCES', payload: preferences });
      } catch (error) {
        console.warn('Error al cargar preferencias de tema:', error);
      }
    }

    // Detectar preferencia de modo oscuro del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (!savedTheme && mediaQuery.matches) {
      dispatch({ type: 'SET_THEME', payload: 'dark' });
    }

    // Detectar preferencia de animaciones reducidas
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      dispatch({ 
        type: 'SET_PREFERENCES', 
        payload: { reducedMotion: true, animations: false } 
      });
    }
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem('selectedTheme', state.currentTheme);
  }, [state.currentTheme]);

  useEffect(() => {
    localStorage.setItem('themePreferences', JSON.stringify(state.preferences));
  }, [state.preferences]);

  // Aplicar tema al document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.currentTheme);
    
    // Aplicar clases CSS globales
    document.body.className = `${state.theme.colors.background} ${state.theme.colors.text} transition-colors duration-300`;
    
    // Aplicar preferencias de animación
    if (state.preferences.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    } else {
      document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
  }, [state.currentTheme, state.theme, state.preferences]);

  // Actions
  const setTheme = (themeName) => {
    if (themes[themeName]) {
      dispatch({ type: 'SET_THEME', payload: themeName });
    }
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const updatePreferences = (preferences) => {
    dispatch({ type: 'SET_PREFERENCES', payload: preferences });
  };

  const resetTheme = () => {
    dispatch({ type: 'RESET_THEME' });
  };

  // Utility functions
  const getThemeClass = (element) => {
    return state.theme.styles[element] || '';
  };

  const getColorClass = (color) => {
    return state.theme.colors[color] || '';
  };

  const value = {
    ...state,
    setTheme,
    toggleTheme,
    updatePreferences,
    resetTheme,
    getThemeClass,
    getColorClass,
    themes: Object.keys(themes)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
};
