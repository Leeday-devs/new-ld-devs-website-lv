import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// Register service worker for performance (production only)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        // Proactively check for updates and reload to avoid stale chunks
        registration.update();
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          // When the new SW takes control, reload to get fresh assets
          window.location.reload();
        });

        if (registration.installing) {
          registration.installing.addEventListener('statechange', () => {
            if (
              registration.installing?.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              window.location.reload();
            }
          });
        }
      })
      .catch(() => {
        // Service worker registration failed
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </HelmetProvider>
);
