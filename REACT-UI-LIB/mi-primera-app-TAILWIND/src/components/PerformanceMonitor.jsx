// src/components/PerformanceMonitor.jsx - Monitor de rendimiento

import React, { useEffect, useRef } from 'react';

const PerformanceMonitor = ({ children }) => {
  const metricsRef = useRef({
    navigationStart: 0,
    loadTime: 0,
    renderTime: 0,
    componentsRendered: 0
  });

  useEffect(() => {
    // Medir tiempo de navegación
    if (window.performance && window.performance.navigation) {
      metricsRef.current.navigationStart = window.performance.timing.navigationStart;
      metricsRef.current.loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    }

    // Observer para medir renders
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          console.log(`⚡ Métrica de rendimiento: ${entry.name} - ${entry.duration.toFixed(2)}ms`);
        }
      });
    });

    // Observar métricas de navegación y medidas
    try {
      observer.observe({ entryTypes: ['navigation', 'measure', 'paint'] });
    } catch (e) {
      console.warn('⚠️ PerformanceObserver no soportado en este navegador');
    }

    // Medir Core Web Vitals
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`🎯 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID) - simulado
      const measureFID = () => {
        const start = performance.now();
        requestAnimationFrame(() => {
          const fid = performance.now() - start;
          console.log(`👆 FID estimado: ${fid.toFixed(2)}ms`);
        });
      };

      // Cumulative Layout Shift (CLS)
      new PerformanceObserver((entryList) => {
        let clsScore = 0;
        entryList.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
          }
        });
        console.log(`📐 CLS: ${clsScore.toFixed(4)}`);
      }).observe({ entryTypes: ['layout-shift'] });

      setTimeout(measureFID, 100);
    };

    // Medir memoria si está disponible
    const measureMemory = () => {
      if (window.performance && window.performance.memory) {
        const memory = window.performance.memory;
        console.log('🧠 Uso de memoria:', {
          used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
          total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
          limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
        });
      }
    };

    // Ejecutar mediciones
    setTimeout(measureWebVitals, 100);
    setTimeout(measureMemory, 1000);

    // Limpiar observer al desmontar
    return () => {
      observer.disconnect();
    };
  }, []);

  // Hook para medir tiempo de render de componentes
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      metricsRef.current.renderTime += renderTime;
      metricsRef.current.componentsRendered += 1;
      
      if (renderTime > 16) { // Más de 16ms puede afectar 60fps
        console.warn(`⚠️ Render lento detectado: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  // Reportar métricas periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      const metrics = metricsRef.current;
      console.log('📊 Métricas de rendimiento:', {
        tiempoCarga: `${metrics.loadTime}ms`,
        tiempoRenderTotal: `${metrics.renderTime.toFixed(2)}ms`,
        componentesRenderizados: metrics.componentsRendered,
        promedioRender: metrics.componentsRendered > 0 
          ? `${(metrics.renderTime / metrics.componentsRendered).toFixed(2)}ms`
          : '0ms'
      });
    }, 30000); // Cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  // En desarrollo, mostrar métricas en pantalla
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="relative">
        {children}
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white text-xs p-2 rounded font-mono z-50">
          <div>Componentes: {metricsRef.current.componentsRendered}</div>
          <div>Render: {metricsRef.current.renderTime.toFixed(1)}ms</div>
        </div>
      </div>
    );
  }

  return children;
};

export default PerformanceMonitor;
