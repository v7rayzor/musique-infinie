const CACHE_NAME = 'ug-67-v1';
const ASSETS = [
  './',
  './index.html',
  './theme1.mp3',
  './theme2.mp3',
  './theme3.mp3',
  './theme4.mp3',
  './theme5.mp3',
  './theme6.mp3',
  './theme7.mp3',
  './theme8.mp3',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js'
];

// Installation : on met tout en cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation : on nettoie les vieux caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// Stratégie : Cache First (on regarde dans le cache avant le réseau)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
