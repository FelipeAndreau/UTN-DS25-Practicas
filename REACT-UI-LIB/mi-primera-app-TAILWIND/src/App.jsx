// App.jsx - Refactorizado con arquitectura de composición y hooks avanzados

import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Importaciones lazy para code splitting
const Layout = lazy(() => import('./components/Layout'));
const Contenido = lazy(() => import('./components/Contenido'));
const Contacto = lazy(() => import('./pages/Contacto'));
const Registro = lazy(() => import('./pages/Registro'));
const SeccionLibros = lazy(() => import('./pages/SeccionLibros'));
const Catalogo = lazy(() => import('./pages/Catalogo'));

// Context providers mejorados
import { UsuarioProvider } from './context/UsuarioContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

// Componentes de utilidad
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import PerformanceMonitor from './components/PerformanceMonitor';

// Hook para configuración de la aplicación
const useAppConfiguration = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulación de carga inicial de configuración
    const initializeApp = async () => {
      try {
        // Cargar configuración del usuario
        const savedConfig = localStorage.getItem('app-config');
        if (savedConfig) {
          console.log('📋 Configuración cargada:', JSON.parse(savedConfig));
        }

        // Precargar recursos críticos
        await Promise.all([
          // Precargar imágenes importantes
          new Promise(resolve => {
            const img = new Image();
            img.onload = resolve;
            img.src = '/logo.png';
          }),
          // Simular carga de datos iniciales
          new Promise(resolve => setTimeout(resolve, 500))
        ]);

        setIsReady(true);
      } catch (error) {
        console.error('❌ Error inicializando aplicación:', error);
        setIsReady(true); // Continuar aunque haya errores
      }
    };

    initializeApp();
  }, []);

  return isReady;
};

// Configuración de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Componente principal con composition pattern
function AppCore() {
    const isReady = useAppConfiguration();

    if (!isReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                <LoadingSpinner size="large" message="Inicializando aplicación..." />
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <PerformanceMonitor>
                <Router>
                    <Suspense 
                        fallback={
                            <div className="min-h-screen flex items-center justify-center">
                                <LoadingSpinner message="Cargando página..." />
                            </div>
                        }
                    >
                        <Layout>
                            <Routes>
                                <Route 
                                    path="/" 
                                    element={<Contenido />} 
                                />
                                <Route 
                                    path="/registro" 
                                    element={<Registro />} 
                                />
                                <Route 
                                    path="/contacto" 
                                    element={<Contacto />} 
                                />
                                <Route 
                                    path="/categoria/:categoria" 
                                    element={<SeccionLibros />} 
                                />
                                <Route 
                                    path="/catalogo" 
                                    element={<Catalogo />} 
                                />
                                <Route 
                                    path="*" 
                                    element={
                                        <div className="min-h-screen flex items-center justify-center">
                                            <div className="text-center">
                                                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                                                <p className="text-gray-600">Página no encontrada</p>
                                            </div>
                                        </div>
                                    } 
                                />
                            </Routes>
                        </Layout>
                    </Suspense>
                </Router>
            </PerformanceMonitor>
        </ErrorBoundary>
    );
}

// Componente App con todos los providers
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <NotificationProvider>
                    <UsuarioProvider>
                        <AppCore />
                    </UsuarioProvider>
                </NotificationProvider>
            </ThemeProvider>
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        </QueryClientProvider>
    );
}

export default App;