self.addEventListener('install', e => {
  e.waitUntil(caches.open('openhabit-cache-v1').then(cache => cache.addAll([
    './',
    './index.html',
    './manifest.webmanifest'
  ])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(resp => resp || fetch(e.request)));
});
