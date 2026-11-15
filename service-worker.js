
const CACHE_NAME = 'yejida-v15-master';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './style/astral.css',
  './style/oraculo.css',
  './style/mandala.css',
  './style/audio.css',
  './style/quiz.css',
  './style/memoria.css',
  './style/reloj.css',
  './style/natal.css',
  './style/dashboard.css',
  './style/transitos.css',
  './style/arbol.css',
  './style/curso.css',
  './style/extras.css',
  './style/donacion.css',
  './style/multiverso.css',
  './js/cosmos.js',
  './js/oraculo.js',
  './js/mandala.js',
  './js/audio.js',
  './js/quiz.js',
  './js/memoria.js',
  './js/reloj.js',
  './js/natal.js',
  './js/dashboard.js',
  './js/transitos.js',
  './js/arbol.js',
  './js/curso.js',
  './js/sinastria.js',
  './js/padrinos.js',
  './js/donacion.js',
  './js/multiverso.js'
];

self.addEventListener('install', e => {
  self.skipWaiting(); // Forzar actualización inmediata
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); })
    ))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
