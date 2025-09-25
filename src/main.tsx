import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import { initializePerformanceOptimizations } from './utils/performanceOptimizations'
import './index.css'

// Initialize performance optimizations immediately
initializePerformanceOptimizations();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </HelmetProvider>
);
