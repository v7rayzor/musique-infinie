const CACHE_NAME = 'ug67-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './theme1.mp3',
  './theme2.mp3',
  './theme3.mp3',
  './theme4.mp3',
  './theme5.mp3',
  './theme6.mp3',
  './theme7.mp3',
  './theme8.mp3'
];

// Installation : on met tout en cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Utilisation : on sert les fichiers du cache en priorité
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
