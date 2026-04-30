const CACHE_NAME = 'v1.2';
const ASSETS = [
  './',
  './index.html'
];

// Installation : on ne met en cache que le squelette de l'app
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Nettoyage des anciens caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Stratégie : Cache First, puis Network + Mise en cache dynamique
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) return res; // Si c'est dans le cache, on le sert immédiatement

      return fetch(e.request).then((networkResponse) => {
        // On ne met en cache que les fichiers réussis (status 200)
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Optionnel : Gérer l'erreur si pas de réseau et pas de cache
      });
    })
  );
});
