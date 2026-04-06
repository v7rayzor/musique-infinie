const CACHE_NAME = 'ug67-studio-v24'; // Change ce nom (v25, v26...) quand tu veux forcer un vidage complet

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './theme1.mp3', './theme2.mp3', './theme3.mp3', './theme4.mp3',
  './theme5.mp3', './theme6.mp3', './theme7.mp3', './theme8.mp3'
];

// Force l'activation immédiate du nouveau code dès qu'il est téléchargé
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Nettoie les anciens caches pour libérer de la place sur le téléphone
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

// Stratégie : On regarde dans le cache d'abord (Zéro Data 4G)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
