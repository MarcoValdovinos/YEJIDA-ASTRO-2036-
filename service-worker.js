
const CACHE_NAME = 'yejida-v6';
const ASSETS = [
  './',
  './index.html',
  './style/astral.css',
  './style/oraculo.css',
  './style/mandala.css',
  './style/audio.css',
  './style/quiz.css',
  './js/cosmos.js',
  './js/oraculo.js',
  './js/mandala.js',
  './js/audio.js',
  './js/quiz.js',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
