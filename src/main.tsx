import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { PopupManager } from '@/components/PopupManager'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ErrorBoundary>
      <App />
      <PopupManager />
    </ErrorBoundary>
  </HelmetProvider>
);
