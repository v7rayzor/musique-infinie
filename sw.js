const CACHE_NAME = 'v1.2*'; 
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

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
