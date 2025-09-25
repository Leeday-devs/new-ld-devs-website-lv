import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import { initializeMobileOptimizations } from './utils/mobileOptimization'
import './index.css'

// Initialize mobile-specific performance optimizations
initializeMobileOptimizations();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </HelmetProvider>
);
