const CACHE_NAME = 'stax-v1';

const CACHE_MANIFEST = [
  './',
  './index.html',
  './manifest.json',
  './css/tokens.css',
  './css/reset.css',
  './css/layout.css',
  './css/stack.css',
  './css/keypad.css',
  './css/history.css',
  './css/slider.css',
  './css/animations.css',
  './js/main.js',
  './js/strings.js',
  './js/engine/rpn.js',
  './js/engine/formatter.js',
  './js/ui/display.js',
  './js/ui/keypad.js',
  './js/ui/drawer.js',
  './js/ui/slider.js',
  './js/ui/haptic.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_MANIFEST))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(hit => hit || fetch(event.request))
  );
});
