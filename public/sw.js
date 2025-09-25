// Enhanced Service Worker for Performance Optimization
const VERSION = '1.2.1';
const CACHE_NAME = `ld-development-v${VERSION}`;
const STATIC_ASSETS = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when possible
// Fetch event - smarter strategy to avoid stale JS chunks
self.addEventListener('fetch', (event) => {
  // Only handle GET HTTP requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  const dest = event.request.destination;

  // Network-first for HTML documents and JS/Workers to prevent stale chunk errors
  if (dest === 'document' || dest === 'script' || dest === 'worker') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Optionally cache the root document for offline fallback
          if (dest === 'document' && response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(async () => {
          // Fallback to cache only if network fails
          const cached = await caches.match(event.request);
          if (cached) return cached;
          if (dest === 'document') return caches.match('/');
        })
    );
    return;
  }

  // Cache-first for styles, images, and fonts
  if (dest === 'style' || dest === 'image' || dest === 'font') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // Default: just fetch from network
  event.respondWith(fetch(event.request));
});