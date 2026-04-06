const CACHE_NAME = 'ug67-studio-v23';

// Liste des fichiers à mettre en mémoire (Audio + Interface)
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

// 1. INSTALLATION : On télécharge tout une seule fois
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Studio UG 67 : Mise en mémoire des fichiers...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. ACTIVATION : Nettoyage des anciens caches si tu changes de version
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
});

// 3. STRATÉGIE "CACHE FIRST" : Utilise la mémoire interne PRIORITAIREMENT
// Cela veut dire : 0 Mo de 4G consommés une fois que c'est installé.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si le fichier est en mémoire, on l'utilise (vitesse instantanée, pas de data)
      if (cachedResponse) {
        return cachedResponse;
      }
      // Sinon, on va sur internet (seulement si pas en cache)
      return fetch(event.request);
    })
  );
});
